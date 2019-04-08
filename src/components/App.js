import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Login from './Login';
import Nav from './Nav';
import NewQuestion from './NewQuestion';
import QuestionPage from './QuestionPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: '#2196f3', height: '5px' }} />
          <div className='container'>
            {this.props.loading ? null : (
              !authedUser ? <Login /> : (
                <Fragment>
                  <Nav />
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' exact component={QuestionPage} />
                  <Route path='/add' exact component={NewQuestion} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                </Fragment>
              )
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    loading: !Object.keys(users).length,
  };
}

export default connect(mapStateToProps)(App);
