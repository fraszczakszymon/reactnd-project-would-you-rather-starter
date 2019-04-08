import { ADD_QUESTION, ROLLBACK_QUESTION_ANSWER, SAVE_QUESTION_ANSWER } from '../actions/questions';
import { RECEIVE_USERS } from '../actions/users';


export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case ROLLBACK_QUESTION_ANSWER:
      const revertedAnswers = {};
      for (const [qid, answer] of Object.entries(state[action.authedUser].answers)) {
        if (qid !== action.qid) {
          revertedAnswers[qid] = answer;
        }
      }

      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: revertedAnswers,
        },
      };
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([ action.question.id ]),
        },
      };
    default:
      return state;
  }
}
