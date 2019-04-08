import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class UserProfile extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
  }

  render() {
    const { authedUser, logOut, users } = this.props;
    const user = users[authedUser];

    return (
      <div className='user-profile'>
        <img src={user.avatarURL} alt={`${user.name}'s avatar`} className='avatar' />
        <div className='user-info'>
          <p>Hello <strong>{user.name}</strong></p>
          <span className='btn' onClick={logOut}>Log out</span>
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

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(setAuthedUser(null)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
