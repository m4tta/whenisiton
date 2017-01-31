import React, { Component } from 'react';
import { Link } from 'react-router';

class Layout extends Component {

  render() {
    return (
      <div>
        <div className="nav">
          <Link to='/' className="brand">When Is It On</Link>
        </div>
        {this.props.children}
      </div>
    );
  }

}

export default Layout;
