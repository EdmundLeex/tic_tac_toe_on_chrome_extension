import React, { Component } from 'react';
import Radium from 'radium';

import Board from './board';
import EnsureSession from './ensure_session';

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
    this.props.changeViewTo('home');
  }

  placeMark(pos) {
    console.log(this.game);
    console.log(pos)
    this.props.placeMark({
      gameId: this.game.id,
      pos: pos
    });
  }

  render() {
    let gameState = JSON.parse(this.game.gameState);
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

export default Radium(Game);