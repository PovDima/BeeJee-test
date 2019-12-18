import React, { Component } from 'react';
import LoginPage from './components/pages/LoginPage';
import TaskPage from './components/pages/TasksPage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as LoginActions from './actions/login';

import './App.css';

class App extends Component {

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
  };

  async componentDidMount() {
    await this.props.checkSession()
  }

  render() {
    const { isLogin } = this.props

    return (
      <div className="App">
        {isLogin ?
          <TaskPage />
          : <LoginPage />
        }
      </div>
    );
  }
}

export default connect(state => {
  return { isLogin: state.login.isLogin }
}, { ...LoginActions })(App);
