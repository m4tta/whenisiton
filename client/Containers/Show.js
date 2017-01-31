import React from 'react';

class Show extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      show: props.location.state.show,
      haveFullDetails: false
    }

    this.getFullDetails(this.state.show);
  }

  componentDidMount() {
    this.setBackground(this.state.show);
  }

  getFullDetails(show) {
    fetch(`/api/tv/${show.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          show: json.results,
          haveFullDetails: true
        });
      });
  }

  setBackground(show) {
    const url = `https://image.tmdb.org/t/p/w1920${show.backdrop_path}`;
    document.body.style.backgroundImage = `url(${url})`;
  }

  render() {
    const show = this.state.show;
    let genres;
    if (show.genres) {
      genres = show.genres.map((genre, index) => {
        return (<div key={index} className="genre">{genre.name}</div>)
      });
    }

    return (
      <div className="container -show">
        <div className="details">
          <img src={`http://image.tmdb.org/t/p/w342${show.poster_path}`} alt={show.name} className="poster"/>
          <div className="details-content">
            <div className="show-name">{show.name}</div>
            <div className="overview">
              <div className="header">Overview</div>
              <div className="body -well">{show.overview}</div>
            </div>
            <div className="next-up">
            </div>
            <div className="genres">
              <div className="header">Genres</div>
              <div className="list">
                {genres}
              </div>
            </div>
          </div>
        </div>
        <div className="details-extra">

        </div>
        <div className="similar">

        </div>
      </div>
    );
  }

}

export default Show;
