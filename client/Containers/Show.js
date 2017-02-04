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
    show: state.show,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ShowActions, ...ClientActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
