import React, { Component, PropTypes } from 'react';

class Time extends Component {

  constructor(props){
    super(props);

    this.state = {
      time: Date()
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({time: Date()})
    }, 1000);
  }

  render() {
    return (
      <div>{this.state.time}</div>
    );
  }

}

export default Time;
