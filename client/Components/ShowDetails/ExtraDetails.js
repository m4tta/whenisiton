import React from 'react';

import Cast from './Cast';

class ExtraDetails extends React.Component {

  render() {
    const show = this.props.show.details;

    if (!show || !this.props.show.fullDetails) {
      return (
        <div className="details-extra -loading">
          <div className="loading"></div>
        </div>
      )
    }

    const networks = show.networks.map((network) => {
      return network.name;
    })
    const runtimes = show.episode_run_time.map((runtimes) => {
      return runtimes + 'm';
    });
    const creators = show.created_by.map((creator) => {
      return creator.name;
    });

    return (
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
        <Cast cast={show.credits.cast}/>
      </div>
    )
  }

}

export default ExtraDetails;
