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
    return (
      <div className="container -show">
        <div className="details">
          <img src={`http://image.tmdb.org/t/p/w342${show.poster_path}`} alt={show.name} className="poster"/>

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
