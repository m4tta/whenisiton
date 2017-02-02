import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const tmdb = require('moviedb')('17c5a1d1fe283613b578056b9ee0b521');

import ResultItem from './ResultItem'

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.itemRefs = {};
    this.state = {
      limit: this.props.limit || 8,
      queryResults: [],
      queryText: '',
      placeholderText: '',
      selected: -1
    }
  }

  componentDidMount() {
    this.query.focus();
    this.query.addEventListener('keydown', this.handleSelection.bind(this));
  }

  componentWillUnmount() {
    this.query.addEventListener('keydown', this.handleSelection.bind(this));
  }

  handleSelection(e) {
    if (e.key == 'ArrowUp') {
      const selected = this.state.selected-1;
      if (selected >= 0) {
        this.setState({
          selected: this.state.selected > -1 ? selected : 0,
          queryText: this.itemRefs[selected].props.show.name
        });
      }
      e.preventDefault();
    }
    else if (e.key == 'ArrowDown') {
      const selected = this.state.selected+1;
      if (selected < _.size(this.itemRefs)) {
        this.setState({
          selected: selected,
          queryText: this.itemRefs[selected].props.show.name
        });
      }
      e.preventDefault();
    }
    else if (e.key == 'Enter') {
      this.itemRefs[this.state.selected].props.handleItem();
    }
  }

  handleChange(e) {
    this.setState({queryText: e.target.value})
    if (this.query.value.length >= 3) {
      tmdb.searchTv({ query: this.query.value }, (err, res) => {
        if (err) this.setState({queryResults: []});
        this.setState({
          queryResults: res.results,
          selected: -1
        });
      });
    } else {
      this.setState({
        queryResults: [],
        selected: -1
      });
    }
  }

  itemClicked(item) {
    this.context.router.push({
      pathname: `/show/${item.id}`,
      state: {
        show: item
      }
    });
  }

  render() {
    this.itemRefs = {};
    let items = this.state.queryResults.slice(0, this.state.limit).map((item, index) => {
      if (this.state.selected >= 0 && this.state.selected < this.state.limit) {
        if (index == this.state.selected) {
          return <ResultItem handleItem={this.itemClicked.bind(this, item)} selected={true} key={index} show={item} ref={(c) => {this.itemRefs[index] = c;}}/>;
        }
      }
      return <ResultItem handleItem={this.itemClicked.bind(this, item)} key={index} show={item} ref={(c) => {this.itemRefs[index] = c;}}/>;
    });

    return (
      <div className="search">
        <input
          type="text"
          autoComplete="off"
          ref={(c) => {this.query = c;}}
          placeholder={this.state.placeholderText}
          value={this.state.queryText}
          onChange={this.handleChange.bind(this)}
        />
        <div className="results-list">
          {items}
        </div>
      </div>
    );
  }

}

Search.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Search;
