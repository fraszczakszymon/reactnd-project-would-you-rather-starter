import PropTypes from 'prop-types';
import React, { Fragment } from 'react'
import { isVoted } from '../utils/helpers';

export default function VoteOption({ authedUser, onVote, optionId, question }) {
  const option = question[optionId];
  const voted = isVoted(authedUser, question);
  const votes = option.votes;
  const numberOfAllVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
  const handleVote = () => {
    onVote(optionId);
  }
  const percent = `${Math.round(100 * votes.length / numberOfAllVotes)}%`;

  return (
    <button
      className={`vote ${votes.includes(authedUser) ? 'voted' : null}`}
      disabled={voted}
      onClick={handleVote}
    >
      <p>...{option.text}?</p>
      {voted && (
        <Fragment>
          <div className='progress-bar'>
            <div className='progress' style={{width: percent}}>
              <p>
                {percent}
              </p>
            </div>
          </div>
          <p>{votes.length} out of {numberOfAllVotes} votes</p>
        </Fragment>
      )}
    </button>
  )
}

VoteOption.propTypes = {
  authedUser: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
};
