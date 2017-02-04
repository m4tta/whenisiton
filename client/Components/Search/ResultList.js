import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';

import ResultItem from './ResultItem';

import * as ClientActions from '../../Actions/client';
import * as ShowActions from '../../Actions/show';

class ResultList extends React.Component {

  itemClicked(show) {
    this.props.setPartialShowDetails(show);
    this.props.setBackground(`https://image.tmdb.org/t/p/w1920${show.backdrop_path}`);
    this.props.dispatch(push(`/show/${show.id}`))
  }

  render() {
    const items = this.props.results.slice(0, this.props.limit).map((item, index) => {
      if (this.props.selected >= 0 && this.props.selected < this.props.limit) {
        if (index == this.props.selected) {
          return <ResultItem handleItem={this.itemClicked.bind(this, item)} selected={true} key={index} show={item} />;
        }
      }
      return <ResultItem handleItem={this.itemClicked.bind(this, item)} key={index} show={item} />;
    });

    return (
      <div className="results-list">
        {items}
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({...ClientActions, ...ShowActions}, dispatch),
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(ResultList);
