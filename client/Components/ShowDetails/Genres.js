import React from 'react';

class Genres extends React.Component {

  render() {
    if (!this.props.genres || !this.props.genres.length) {
      return null;
    }

    // Genre badge elements
    const genres = this.props.genres.map((genre, index) => {
      return (<div key={index} className="genre">{genre.name}</div>)
    });
    return (
      <div className="genres">
        <div className="header">Genres</div>
        <div className="list">
          {genres}
        </div>
      </div>
    );
  }

}

export default Genres;
