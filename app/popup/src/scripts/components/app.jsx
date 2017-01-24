import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

import Board from './board';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Board {...this.props}/>
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
