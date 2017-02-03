import React from 'react';

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
        <div className="cast">
          <div className="cast-header">Cast</div>
          <div className="cast-list">
            {members}
          </div>
        </div>
      </div>
    )
  }

}

export default ExtraDetails;
