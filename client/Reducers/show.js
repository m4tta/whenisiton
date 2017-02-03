import _ from 'lodash';

export default function show(state = {_fullDetails: false}, action) {
  switch (action.type) {
    case 'SHOW_DETAILS':
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

      newState.details.credits.cast[i] = {...newState.details.credits.cast[i], ...action.externals};

      return newState;

      break;
    default:
      return state;
  }
}
