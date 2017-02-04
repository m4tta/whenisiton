const tmdb = require('moviedb')('17c5a1d1fe283613b578056b9ee0b521');

export function searchTV(query) {
  return (dispatch) => {
    tmdb.searchTv({ query }, (err, res) => {
      if (err) dispatch(emptyResults());
      dispatch(setSearchResults(res.results));
    });
  }
}

export function setQueryText(queryText) {
  return {
    type: 'QUERY_TEXT',
    queryText
  }
}

export function setSearchResults(results) {
  return {
    type: 'SEARCH_RESULTS',
    results
  }
}

export function emptyResults() {
  return {
    type: 'EMPTY_RESULTS',
  }
}

export function setSelectedResult(selected) {
  return {
    type: 'SELECTED_RESULT',
    selected
  }
}
