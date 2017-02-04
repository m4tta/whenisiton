import React from 'react';
import moment from 'moment';

import ExtraDetails from './ExtraDetails';
import NextEpisode from './NextEpisode';
import Genres from './Genres';

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
            <NextEpisode/>
            <Genres genres={show.genres} />
          </div>
        </div>
      </div>
    );
  }

}

export default ShowDetails;
