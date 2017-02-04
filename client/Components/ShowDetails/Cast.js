import React from 'react';

class Cast extends React.Component {

  render() {
    if (!this.props.cast.length) {
      return null;
    }
    const members = this.props.cast.slice(0,9).map((member, index) => {
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
      <div className="cast">
        <div className="cast-header">Cast</div>
        <div className="cast-list">
          {members}
        </div>
      </div>
    );
  }

}

export default Cast;
