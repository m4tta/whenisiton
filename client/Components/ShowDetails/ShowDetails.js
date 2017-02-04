import React from 'react';
import moment from 'moment';

import ExtraDetails from './ExtraDetails';

// Images
import imdbImage from '../../assets/imdb.png';

class ShowDetails extends React.Component {

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
    if (this.props.show.hasNextEpisode) {
      const date = moment(this.props.show.nextEpisode.air_date);
      const when = date.isSame(moment(), 'day') ? 'Today' : date.fromNow();
      nextEpisode = (
        <div className="next-up">
          <div className="action">Next Up <span className="episode-title">"{this.props.show.nextEpisode.name}"</span></div>
          <div className="time">{`Airing ${when}`}</div>
        </div>
      )
    }
    else if (this.props.show.hasNextEpisode == false){
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

    let poster;
    if (show.poster_path) {
      poster = <img src={`http://image.tmdb.org/t/p/w342${show.poster_path}`} alt={show.name} className="poster"/>;
    }

    return (
      <div className="container -show">
        <div className="details">
          {poster}
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
