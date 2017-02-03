export default function client(state = {}, action) {
  switch (action.type) {
    case 'SET_BACKGROUND':
      return {
        backgroundUrl: action.backgroundUrl,
      }
      break;
    default:
      return state;
  }
}
