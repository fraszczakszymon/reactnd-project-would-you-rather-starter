import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
  }

  state = {
    userId: '',
  }

  handleSubmit = (event) => {
    const { userId } = this.state;
    const { logIn } = this.props;

    event.preventDefault();
    logIn(userId);
  }

  handleChange = ({ target }) => {
    this.setState(() => ({
      userId: target.id,
    }));
  }

  render() {
    const { userId } = this.state;
    const { users } = this.props;
    const userIds = Object.keys(users);

    return (
      <div className='login-contanier'>
        <h2 className='center'>Select user:</h2>
        <form onSubmit={this.handleSubmit}>
          <ul>
            {userIds.map((id) => (
              <li
                id={id}
                key={id}
                className={`user ${id === userId ? 'active' : null}`}
                onClick={this.handleChange}
              >
                {users[id].name}
              </li>
            ))}
          </ul>
          <p className='right'>
            <button
              className='btn'
              type='submit'
              disabled={!userId}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: (userId) => dispatch(setAuthedUser(userId)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
