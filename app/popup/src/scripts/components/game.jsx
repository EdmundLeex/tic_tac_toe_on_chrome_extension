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

    this.goBack = this.goBack.bind(this);
    this.placeMark = this.placeMark.bind(this);
    this.game = this.props.game.currentGame;
  }

  goBack() {
    this.props.changeViewTo('gameIndex');
  }

  placeMark(pos) {
    this.props.placeMark({
      gameId: this.game.id,
      pos: pos
    });
  }

  render() {
    let gameState = this.game.gameState;
    let board = gameState.board ? gameState.board : null;

    if (!board) { return (<div></div>); }

    let grid = board.grid;

    return (
      <div>
        <EnsureSession />
        <div onClick={this.goBack}>{'<Back'}</div>
        <Board
          {...this.props}
          placeMark={this.placeMark}
          board={board}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

export default connect(mapStateToProps, actionCreators)(Radium(Game));
