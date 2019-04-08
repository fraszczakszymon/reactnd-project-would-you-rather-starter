import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class UserProfile extends Component {
  handleLogOut = () => {
    const { dispatch } = this.props;

    dispatch(setAuthedUser(null));
  }

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];

    return (
      <div className='user-profile'>
        <img src={user.avatarURL} alt={`${user.name}'s avatar`} className='avatar' />
        <div className='user-info'>
          <p>Hello <strong>{user.name}</strong></p>
          <span className='btn' onClick={this.handleLogOut}>Log out</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(UserProfile);
