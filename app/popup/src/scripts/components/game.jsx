import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Board from './board';
import EnsureSession from './ensure_session';
import * as actionCreators from '../action_creators';

const styles = {
  bold: {
    fontFamily: 'arial',
    textAlign: 'center',
    margin: '0 auto',
    display: 'block',
    fontSize: '20px',
    marginTop: '8px',
    marginBottom: '8px'
  }
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
    let game = this.props.game;
    let currentMark = gameState.currentPlayer.mark;
    let board = gameState.board ? gameState.board : null;
    let allowedGrid = gameState.gameRule.allowedGrid;

    let tipsContent;
    if (game.status === 'AWAITING_FOR_OPONENT') {
      tipsContent = 'Waiting for an oponent. Invite your friend!'
    } else if (game.winnerId) {
      if (game.winnerId === this.props.user.id) {
        tipsContent = 'Congrats! You Won!';
      } else {
        tipsContent = 'Oops... You lost.';
      }
    } else {
      tipsContent = `Next Move: ${currentMark}`;
    }

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
          gameStarted={game.status === 'STARTED'}
        />
        <div style={styles.bold}>{tipsContent}</div>
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
