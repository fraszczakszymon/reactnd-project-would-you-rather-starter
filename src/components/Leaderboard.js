import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';

class Leaderboard extends Component {
  static propTypes = {
    userIds: PropTypes.array.isRequired,
  }

  render() {
    const { userIds } = this.props;

    return (
      <div className='leaderboard'>
        <ul>
          {userIds.map((userId, id) => (
            <li key={userId}>
              <User id={userId} place={id + 1} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
      .sort((a, b) => {
        const scoreA = users[a].questions.length + Object.keys(users[a].answers).length;
        const scoreB = users[b].questions.length + Object.keys(users[b].answers).length;

        return scoreB - scoreA;
      }),
  };
}

export default connect(mapStateToProps)(Leaderboard);
