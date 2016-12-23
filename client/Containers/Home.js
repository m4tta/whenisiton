import React, { Component, PropTypes } from 'react';

import Time from '../Components/Time';

class Home extends Component {

  render() {
    return (
      <div>
        <p className="red">React!!!</p>
        <Time/>
      </div>
    );
  }

}

export default Home;
