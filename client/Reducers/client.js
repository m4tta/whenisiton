export default function client(state = {}, action) {
  switch (action.type) {
    case 'SET_BACKGROUND':
      return {
        ...state,
        backgroundUrl: action.backgroundUrl,
      }
      break;
    case 'SET_PAGETITLE':
      return {
        ...state,
        pageTitle: action.title,
      }
      break;
    default:
      return state;
  }
}
