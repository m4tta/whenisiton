import React from 'react';
import moment from 'moment';

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

  componentWillUpdate(nextProps, nextState) {
    if (nextState.show) {
      this.setBackground(nextState.show);
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
        this.getNextEpisode(this.state.show);
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
      const members = show.credits.cast.slice(0,9).map((member, index) => {
        return (
          <div className="member" key={index}>
            <span className="character">{member.character}</span>
            <span className="actor">{member.name}</span>
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
                  <img src={imdbImage} alt="IMDB - The Blacklist"/>
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
