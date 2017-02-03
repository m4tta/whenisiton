import * as ClientActions from './client';

const tmdb = require('moviedb')('17c5a1d1fe283613b578056b9ee0b521');

export function getShowDetails(showId) {
  return (dispatch) => {
    fetch(`/api/tv/${showId}`)
      .then((response) => {return response.json();})
      .then((json) => {
        dispatch(setShowDetails(json.results));
        dispatch(ClientActions.setBackground(`https://image.tmdb.org/t/p/w1920${json.results.backdrop_path}`));
        dispatch(getCastExternals());
        dispatch(getNextEpisode());
      });
  }
}

export function getCastExternals() {
  return (dispatch, getState) => {
    // const { show: {details: {credits: {cast}}} } = getState();
    const cast = getState().show.details.credits.cast;
    cast.forEach((member) => {
      tmdb.personExternalIds({id: member.id}, (err, externals) => {
        dispatch(setCastMemberExternals(externals))
      });
    });
  }
}

export function getNextEpisode() {
  return (dispatch, getState) => {
    const currentShow = getState().show.details;
    fetch(`/api/tv/${currentShow.id}/${currentShow.number_of_seasons}/nextepisode`)
      .then((response) => {return response.json();})
      .then((json) => {
        if (json.success) {
          dispatch(setNextEpisode(json.results));
        } else {
          dispatch(setNextEpisode());
        }
      });
  }
}


export function setNextEpisode(episode) {
  return {
    type: 'NEXT_EPISODE',
    hasNextEpisode: episode ? true : false,
    episode
  }
}

export function setCastMemberExternals(externals) {
  return {
    type: 'CAST_MEMBER_EXTERNALS',
    externals
  }
}

export function setShowDetails(show) {
  return {
    type: 'SHOW_DETAILS',
    show: show,
    fullDetails: true,
  }
}

export function setPartialShowDetails(show) {
  return {
    type: 'SHOW_DETAILS',
    show: show,
    fullDetails: false,
  }
}
