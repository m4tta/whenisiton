import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

class ResultItem extends React.Component {

  render() {
    const year = moment(this.props.show.first_air_date).year() || '';
    return (
      <div
        className={classnames('result', {'-selected': this.props.selected})}
        onClick={this.props.handleItem}
      >
        <span className="name">{this.props.show.name}</span>
        <span className="date">{year}</span>
      </div>
    );
  }

}

export default ResultItem;
