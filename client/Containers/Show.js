import React from 'react';

import ShowDetails from '../Components/ShowDetails/ShowDetails';
import ExtraDetails from '../Components/ShowDetails/ExtraDetails';
import Footer from '../Components/Footer';

class Show extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.location.state ? props.location.state.show : null,
      haveFullDetails: false
    }

    const showID = this.state.show ? this.state.show.id : props.params.id;
    this.getFullDetails(showID);
  }

  getFullDetails(showId) {
    fetch(`/api/tv/${showId}`)
      .then((response) => {return response.json();})
      .then((json) => {
        this.setState({
          show: {...json.results, _fullDetails: true},
        });
        this.setBackground(this.state.show);
      });
  }

  setBackground(show) {
    const url = `https://image.tmdb.org/t/p/w1920${show.backdrop_path}`;
    document.body.style.backgroundImage = `url(${url})`;
  }

  render() {
    return (
      <div>
        <div className="container -show">
          <ShowDetails show={this.state.show}/>
          <ExtraDetails show={this.state.show}/>
        </div>
        <Footer />
      </div>
    );
  }

}

export default Show;
