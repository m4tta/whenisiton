import React from 'react';
import classnames from 'classnames';

class ResultItem extends React.Component {

  render() {
    return (
      <div
        className={classnames('result', {'-selected': this.props.selected})}
        onClick={this.props.handleItem}
      >
        <span className="name">{this.props.show.name}</span>
        <span className="date">{this.props.show.first_air_date}</span>
      </div>
    );
  }

}

export default ResultItem;
