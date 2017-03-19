import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Board from './board';
import EnsureSession from './ensure_session';
import * as actionCreators from '../action_creators';

const styles = {

};

class Game extends Component {
  constructor(props) {
    super(props);

    this.placeMark = this.placeMark.bind(this);
  }

  placeMark(pos) {
    this.props.placeMark({
      gameId: this.props.game.id,
      pos: pos
    });
  }

  render() {
    let gameState = JSON.parse(this.props.gameState);
    let board = gameState.board ? gameState.board : null;
    let allowedGrid = gameState.gameRule.allowedGrid;

    if (!board) { return (<div></div>); }

    let grid = board.grid;

    return (
      <div>
        <EnsureSession />
        <Board
          {...this.props}
          placeMark={this.placeMark}
          board={board}
          allowedGrid={allowedGrid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game.currentGame,
    gameState: state.game.currentGameState,
    user: state.user
  };
};

export default connect(mapStateToProps, actionCreators)(Radium(Game));
