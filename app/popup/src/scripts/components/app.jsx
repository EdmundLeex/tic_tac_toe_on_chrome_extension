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
        <Notification />
        <SignIn {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let game = state.game ? state.game.game : {}
  return {
    game: game
  };
};

export default connect(mapStateToProps, actionCreators)(App);
