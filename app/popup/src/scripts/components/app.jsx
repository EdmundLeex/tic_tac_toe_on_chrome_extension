import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

import Board from './board';
import SignIn from './sign_in';
import Notification from './notification';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Notification {...this.props} />
        <SignIn {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    notification: state.notification
  };
};

export default connect(mapStateToProps, actionCreators)(App);
