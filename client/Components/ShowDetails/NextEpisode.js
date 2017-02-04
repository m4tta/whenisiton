import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class NextEpisode extends React.Component {

  render() {
    // Next Episode element
    if (this.props.hasNextEpisode) {
      const date = moment(this.props.nextEpisode.air_date);
      const when = date.isSame(moment(), 'day') ? 'Today' : date.fromNow();
      return (
        <div className="next-up">
          <div className="action">Next Up <span className="episode-title">"{this.props.nextEpisode.name}"</span></div>
          <div className="time">{`Airing ${when}`}</div>
        </div>
      )
    }
    else if (this.props.hasNextEpisode == false){
      return (
        <div className="next-up">
          <span className="no-episode">No new episodes coming up.</span>
        </div>
      )
    }
    else {
      return (
        <div className="next-up -loading">
          <div className="loading-pulse"></div>
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    hasNextEpisode: state.show.hasNextEpisode,
    nextEpisode: state.show.nextEpisode,
  }
}

export default connect(mapStateToProps)(NextEpisode);
