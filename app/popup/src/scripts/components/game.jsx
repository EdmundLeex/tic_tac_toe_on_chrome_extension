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
  }

  goBack() {
    this.props.changeViewTo('home');
  }

  render() {
    let game = JSON.parse(this.props.game.currentGame.gameState);
    let board = game.board ? game.board : null;

    if (!board) { return (<div></div>); }

    let grid = board.grid;

    return (
      <div>
        <EnsureSession />
        <div onClick={this.goBack}>{'<Back'}</div>
        <Board board={board} />
      </div>
    );
  }
}

export default Radium(Game);