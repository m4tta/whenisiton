import _ from 'lodash';

export default function show(state = {_fullDetails: false}, action) {
  switch (action.type) {
    case 'SHOW_DETAILS':
      // getting SHOW_DETAILS should ignore previous state and create new object
      return {
        details: action.show,
        fullDetails: action.fullDetails,
      }

      break;
    case 'CAST_MEMBER_EXTERNALS':
      const newState = {...state};
      const i = _.findIndex(newState.details.credits.cast, (member) => {
        return member.id == action.externals.id;
      });
      // TODO: explore what is going on with externals
      // first state update shows all externals populated
      newState.details.credits.cast[i] = {...newState.details.credits.cast[i], ...action.externals};

      return newState;
      break;
    case 'NEXT_EPISODE':
      return {...state, nextEpisode: action.episode, hasNextEpisode: action.hasNextEpisode};
      break;
    default:
      return state;
  }
}
