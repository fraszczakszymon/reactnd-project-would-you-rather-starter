import { SET_AUTHED_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      if (window.localStorage) {
        if (action.id ===  null) {
          window.localStorage.removeItem('authedUser');
        } else {
          window.localStorage.setItem('authedUser', action.id);
        }
      }

      return action.id
    default:
      return state;
  }
}
