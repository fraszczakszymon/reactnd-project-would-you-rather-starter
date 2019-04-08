import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteOption from './VoteOption';
import { handleQuestionAnswer } from '../actions/questions';

class QuestionPage extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    author: PropTypes.object,
    id: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    question: PropTypes.object,
  }

  handleVote = (option) => {
    const { authedUser, id, vote } = this.props;

    vote({
      answer: option,
      authedUser,
      qid: id,
    });
  }

  render() {
    const { authedUser, author, question } = this.props;

    if (!question) {
      return (
        <div>
          <h2>404</h2>
          <p>Question does not exist.</p>
        </div>
      )
    }

    return (
      <div className='question-card'>
        <p className='author'>
          <img src={author.avatarURL} alt={`${author.name}'s avatar`} className='avatar' />
          {author.name} asks: <strong>Would you rather</strong>
        </p>
        <p className='center'>
          <VoteOption
            authedUser={authedUser}
            onVote={this.handleVote}
            optionId='optionOne'
            question={question}
          />
          or
          <VoteOption
            authedUser={authedUser}
            onVote={this.handleVote}
            optionId='optionTwo'
            question={question}
          />
        </p>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { id } = match.params;
  const question = questions[id];

  return {
    authedUser,
    author: question ? users[question.author] : null,
    id,
    question,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (answer) => dispatch(handleQuestionAnswer(answer)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
