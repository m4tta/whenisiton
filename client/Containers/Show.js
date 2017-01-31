import React from 'react';
import moment from 'moment';

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
    const yearAired = moment(show.first_air_date).year();
    let genres;
    let nextEpisode;
    if (show.genres) {
      genres = show.genres.map((genre, index) => {
        return (<div key={index} className="genre">{genre.name}</div>)
      });
    }

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
        <div className="details-extra">

        </div>
        <div className="similar">

        </div>
      </div>
    );
  }

}

export default Show;
