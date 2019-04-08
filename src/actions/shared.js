import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export const handleInitialData = () => (dispatch) => {
  const authedUserId = window.localStorage ? window.localStorage.getItem('authedUser') : null;

  dispatch(showLoading());

  return getInitialData()
    .then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(authedUserId));
      dispatch(hideLoading());
    });
}
