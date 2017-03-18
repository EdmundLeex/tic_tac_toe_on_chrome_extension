import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

import Notification from './notification';
import Main from './main';
import StickyTop from './sticky_top';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Notification />
        <StickyTop />
        <Main {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    login: state.loginForm,
    signUp: state.signUpForm
  };
};

export default connect(mapStateToProps, actionCreators)(App);
