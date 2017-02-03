import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ShowActions from '../Actions/show';
import * as ClientActions from '../Actions/client';

import ShowDetails from '../Components/ShowDetails/ShowDetails';
import ExtraDetails from '../Components/ShowDetails/ExtraDetails';
import Footer from '../Components/Footer';

class Show extends React.Component {
  constructor(props) {
    super(props);

    this.props.getShowDetails(props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // TODO: this is running too much
    // make sure it only runs once
    if (nextProps.show.details) {
      this.setBackground(nextProps.show.details);
    }
  }

  setBackground(show) {
    const url = `https://image.tmdb.org/t/p/w1920${show.backdrop_path}`;
    this.props.setBackground(url);
  }

  render() {
    return (
      <div>
        <div className="container -show">
          <ShowDetails show={this.props.show}/>
          <ExtraDetails show={this.props.show}/>
        </div>
        <Footer />
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    show: state.show
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ShowActions, ...ClientActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
