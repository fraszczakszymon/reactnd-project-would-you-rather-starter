import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Question from './Question';

class Dashboard extends Component {
  static propTypes = {
    votedQuestions: PropTypes.array.isRequired,
    questionIds: PropTypes.array.isRequired,
  }

  render() {
    const { votedQuestions, questionIds } = this.props;
    const params = new URLSearchParams(window.location.search);
    const showAnswered = params.get('show') === 'answered';
    const selectedQuestionIds = questionIds
      .filter((questionId) => votedQuestions.includes(questionId) === showAnswered);

    return (
      <div>
        <ul className='questions-filter'>
          <li>Show:</li>
          <li>
            <Link to='/' className={!showAnswered ? 'active' : ''} disabled={!showAnswered}>Unanswered</Link>
          </li>
          <li>
            <Link to='/?show=answered' className={showAnswered ? 'active' : ''} disabled={showAnswered}>Answered</Link>
          </li>
        </ul>
        <ul>
          {selectedQuestionIds
            .map((questionId) => (
              <li key={questionId}>
                <Question id={questionId} />
              </li>
            ))
          }
        </ul>
        {selectedQuestionIds.length === 0 && (
          <div className='center'>
            <h3>There are no questions yet</h3>
            <p><Link to='/add'>Create a new one</Link></p>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    votedQuestions: Object.keys(users[authedUser].answers),
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  };
}

export default connect(mapStateToProps)(Dashboard);
