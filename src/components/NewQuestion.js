import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
  }

  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleSubmit = (event) => {
    const { addQuestion, authedUser, history } = this.props;
    const { optionOne, optionTwo } = this.state;

    event.preventDefault();

    if (!optionOne || !optionTwo) {
      return;
    }

    addQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    });

    history.push('/');
  }

  handleChange = ({ target }) => {
    const { id, value } = target;

    this.setState(() => ({
      [id]: value
    }));
  }

  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className='question-card new-question'>
        <p>
          <strong>Would you rather...</strong>
        </p>
        <p>
          <input
            id='optionOne'
            onChange={this.handleChange}
            placeholder='First option'
            value={optionOne}
            type='text' />
        </p>
        <p>
          <input
            id='optionTwo'
            onChange={this.handleChange}
            placeholder='Second option'
            value={optionTwo}
            type='text' />
        </p>
        <p className='right'>
          <button
            className='btn'
            disabled={!optionOne || !optionTwo}
            type='submit'
          >
            Add
          </button>
        </p>
      </form>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (question) => dispatch(handleAddQuestion(question)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewQuestion));
