import React from 'react';
import moment from 'moment';

import ExtraDetails from './ExtraDetails';

// Images
import imdbImage from '../../assets/imdb.png';

class ShowDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextEpisode: false
    }

    if (this.props.show.fullDetails) {
      this.getNextEpisode(this.props.show.details);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show.fullDetails) {
      this.getNextEpisode(nextProps.show.details);
    }
  }

  getNextEpisode(show) {
    // TODO: Move this to an action and reducer
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

  render() {
    const show = this.props.show.details;

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
      </div>
    );
  }

}

export default ShowDetails;
