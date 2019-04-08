import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ROLLBACK_QUESTION_ANSWER = 'ROLLBACK_QUESTION_ANSWER';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function answerQuestion(info) {
  return {
    type: SAVE_QUESTION_ANSWER,
    answer: info.answer,
    authedUser: info.authedUser,
    qid: info.qid,
  };
}

function rollbackAnswer(info) {
  return {
    type: ROLLBACK_QUESTION_ANSWER,
    answer: info.answer,
    authedUser: info.authedUser,
    qid: info.qid,
  };
}

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export const handleAddQuestion = (question) => (dispatch) => {
  dispatch(showLoading());

  saveQuestion(question)
    .then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
      dispatch(hideLoading());
    })
    .catch(() => {
      dispatch(hideLoading());
      alert('There was an error in saving question. Try again.');
    });
}

export const handleQuestionAnswer = (info) => (dispatch) => {
  dispatch(answerQuestion(info));

  saveQuestionAnswer(info)
    .catch(() => {
      dispatch(rollbackAnswer(info));
      alert('There was an error in saving answer. Try again.');
    });
}
