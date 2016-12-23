import React, { Component } from 'react';

import './app.scss';

class Layout extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default Layout;
