import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiTrophy } from "react-icons/gi";

class User extends Component {
  render() {
    const { place, user } = this.props;

    return (
      <div className={`leaderboard-user ${place === 1 ? 'leader' : null}`}>
        {place === 1 && (<div>
          <GiTrophy />
        </div>)}
        <div>
          <img src={user.avatarURL} alt={`${user.name}'s avatar`} className='avatar' />
        </div>
        <div className='details'>
          <p>{place}. <strong>{user.name}</strong></p>
          <p className='numbers'>added: {user.addedQuestions}, answered: {user.answeredQuestions}</p>
        </div>
        <div className='score-container right'>
          <p className='center'>Score</p>
          <p className='score center'>{user.score}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    user: {
      ...users[id],
      addedQuestions: users[id].questions.length,
      answeredQuestions: Object.keys(users[id].answers).length,
      score: users[id].questions.length + Object.keys(users[id].answers).length,
    }
  };
}

export default connect(mapStateToProps)(User);
