import React, { Component } from 'react';

class Layout extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <a  className="brand">When Is It On</a>
        </div>
        {this.props.children}
      </div>
    );
  }

}

export default Layout;
