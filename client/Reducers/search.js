const initialState = {
  results: [],
  selected: -1
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_RESULTS':
      return {
        ...state,
        results: action.results,
        selected: -1,
      }
      break;
    case 'QUERY_TEXT':
      return {
        ...state,
        query: action.queryText,
      }
      break;
    case 'EMPTY_RESULTS':
      return {
        ...state,
        results: [],
        selected: -1,
      }
      break;
    case 'SELECTED_RESULT':
      return {
        ...state,
        selected: action.selected,
        query: state.results[action.selected].name,
      }
      break;
    default:
      return state;
  }
}
