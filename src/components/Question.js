import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Question extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
  }

  render() {
    const { author, id, question } = this.props;

    return (
      <div className='question-card'>
        <p className='author'>
          <img src={author.avatarURL} alt={`${author.name}'s avatar`} className='avatar' /> 
          {author.name} asks: <strong>Would you rather</strong>
        </p>
        <p>...{question.optionOne.text} or...</p>
        <p className='go-to right'>
          <Link to={`/question/${id}`}>View Poll</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];

  return {
    author: users[question.author],
    question,
  };
}

export default connect(mapStateToProps)(Question);
