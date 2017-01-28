import React from 'react';
import classnames from 'classnames';

class ResultItem extends React.Component {

  handleItem(item) {
    // TODO: react route to show page for this ID
    console.log(item);
  }

  render() {
    if (this.props) {

    }
    return (
      <div
        className={classnames('result', {'-selected': this.props.selected})}
        onClick={this.handleItem.bind(this, this.props.show)}
      >
        <span className="name">{this.props.show.name}</span>
        <span className="date">{this.props.show.first_air_date}</span>
      </div>
    );
  }

}

export default ResultItem;
