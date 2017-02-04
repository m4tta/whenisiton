export default function client(state = {}, action) {
  switch (action.type) {
    case 'SET_BACKGROUND':
      return {
        backgroundUrl: action.backgroundUrl,
      }
      break;
    case 'SET_PAGETITLE':
      return {
        pageTitle: action.title,
      }
      break;
    default:
      return state;
  }
}
