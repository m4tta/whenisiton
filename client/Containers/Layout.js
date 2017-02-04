import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Layout extends Component {

  render() {
    document.body.style.backgroundImage = `url(${this.props.backgroundUrl})`;
    document.title = this.props.pageTitle || 'When Is It On?';
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

function mapStateToProps(state) {
  return {
    backgroundUrl: state.client.backgroundUrl,
    pageTitle: state.client.pageTitle,
  };
}

export default connect(mapStateToProps)(Layout);
