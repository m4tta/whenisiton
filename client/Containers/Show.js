import React from 'react';
import moment from 'moment';

const tmdb = require('moviedb')('17c5a1d1fe283613b578056b9ee0b521');

// Images
import imdbImage from '../assets/imdb.png';

class Show extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.location.state ? props.location.state.show : null,
      haveFullDetails: false
    }

    const showID = this.state.show ? this.state.show.id : props.params.id;
    this.getFullDetails(showID);
    if (this.state.show) {
      this.setBackground(this.state.show);
    }
  }

  getFullDetails(showId) {
    fetch(`/api/tv/${showId}`)
      .then((response) => {return response.json();})
      .then((json) => {
        this.setState({
          show: json.results,
          haveFullDetails: true
        });
        this.setBackground(this.state.show);
        this.getNextEpisode(this.state.show);
        this.getCastExternals();
      });
  }

  getNextEpisode(show) {
    fetch(`/api/tv/${show.id}/${show.number_of_seasons}/nextepisode`)
      .then((response) => {return response.json();})
      .then((json) => {
        if (json.success) {
          this.setState({
            nextEpisode: json.results,
          });
        } else {
          this.setState({
            nextEpisode: false,
          });
        }
      });
  }

  getCastExternals() {
    const show = this.state.show;
    for (let i = 0; i < show.credits.cast.length; i++) {
      show.credits.cast[i]
      tmdb.personExternalIds({id: show.credits.cast[i].id}, (err, res) => {
        show.credits.cast[i] = {...show.credits.cast[i], ...res};
        this.setState({show});
      });
    }
  }

  setBackground(show) {
    const url = `https://image.tmdb.org/t/p/w1920${show.backdrop_path}`;
    document.body.style.backgroundImage = `url(${url})`;
  }

  render() {
    const show = this.state.show;

    if (!show) {
      return (
        <div className="container -show -loading">
          <div className="loading -large"></div>
        </div>
      )
    }

    const yearAired = moment(show.first_air_date).year();
    const imdbLink = show.external_ids ? `http://imdb.com/title/${show.external_ids.imdb_id}/` : '#';
    // element placeholder variables
    let genres;
    let nextEpisode;
    let extraDetails;

    // Genre badge elements
    if (show.genres) {
      genres = show.genres.map((genre, index) => {
        return (<div key={index} className="genre">{genre.name}</div>)
      });
    }

    // Next Episode element
    if (this.state.nextEpisode) {
      const date = moment(this.state.nextEpisode.air_date);
      const when = date.isSame(moment(), 'day') ? 'Today' : date.fromNow();
      nextEpisode = (
        <div className="next-up">
          <div className="action">Next Up <span className="episode-title">"{this.state.nextEpisode.name}"</span></div>
          <div className="time">{`Airing ${when}`}</div>
        </div>
      )
    }
    else if (this.state.nextEpisode == false){
      nextEpisode = (
        <div className="next-up">
          <span className="no-episode">No new episodes coming up.</span>
        </div>
      )
    }
    else {
      nextEpisode = (
        <div className="next-up -loading">
          <div className="loading-pulse"></div>
        </div>
      )
    }

    // Extra details
    if (this.state.haveFullDetails) {
      const networks = show.networks.map((network) => {
        return network.name;
      })
      const runtimes = show.episode_run_time.map((runtimes) => {
        return runtimes + 'm';
      });
      const creators = show.created_by.map((creator) => {
        return creator.name;
      });
      const members = show.credits.cast.slice(0,9).map((member, index) => {
        const twitter = member.twitter_id ? (
            <a href={`http://twitter.com/${member.twitter_id}/`}>
              <i className="fa fa-twitter-square fa-lg grow" aria-hidden="true" />
            </a>
          ) : '';
        const instagram = member.instagram_id ? (
            <a href={`http://instagram.com/${member.instagram_id}/`}>
              <i className="fa fa-instagram fa-lg grow" aria-hidden="true" />
            </a>
          ) : '';
        return (
          <div className="member" key={index}>
            <span className="character">{member.character}</span>
            <div className="actor">
              <a href={`http://www.imdb.com/name/${member.imdb_id}/`}>{member.name}</a>
              <div className="social">
                <a href={`http://www.imdb.com/name/${member.imdb_id}/`}>
                  <i className="fa fa-imdb fa-lg grow" aria-hidden="true" />
                </a>
                {twitter}
                {instagram}
              </div>
            </div>
          </div>
        )
      });
      extraDetails = (
        <div className="details-extra">
          <div className="extra">
            <div className="detail">
              <span>Status</span>
              <span>{show.status}</span>
            </div>
            <div className="detail">
              <span>Network</span>
              <span>{networks.join(', ')}</span>
            </div>
            <div className="detail">
              <span>Creators</span>
              <span>{creators.join(', ')}</span>
            </div>
            <div className="detail">
              <span>Runtimes</span>
              <span>{runtimes.join(', ')}</span>
            </div>
            <div className="detail">
              <span>Homepage</span>
              <span><a href={show.homepage}>{show.homepage}</a></span>
            </div>
          </div>
          <div className="cast">
            <div className="cast-header">Cast</div>
            <div className="cast-list">
              {members}
            </div>
          </div>
        </div>
      )
    }
    else {
      extraDetails = (
        <div className="details-extra -loading">
          <div className="loading"></div>
        </div>
      )
    }

    return (
      <div className="container -show">
        <div className="details">
          <img src={`http://image.tmdb.org/t/p/w342${show.poster_path}`} alt={show.name} className="poster"/>
          <div className="details-content">
            <div className="show-header">
              <div className="title">
                <span className="name">{show.name}</span>
                <span className="year">({yearAired})</span>
              </div>
              <div className="buttons">
                <a href={imdbLink}>
                  <i className="fa fa-imdb fa-3x" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="overview">
              <div className="header">Overview</div>
              <div className="body -well">{show.overview}</div>
            </div>
            {nextEpisode}
            <div className="genres">
              <div className="header">Genres</div>
              <div className="list">
                {genres}
              </div>
            </div>
          </div>
        </div>
        {extraDetails}
        <div className="similar">

        </div>
      </div>
    );
  }

}

export default Show;
