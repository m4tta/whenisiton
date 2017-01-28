import React, { Component, PropTypes } from 'react';

import Search from '../Components/Search';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container content">
        <Search/>
      </div>
    );
  }

}

export default Home;
