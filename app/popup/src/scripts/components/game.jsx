import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import Board from './board';
import EnsureSession from './ensure_session';
import * as actionCreators from '../action_creators';
import BASE_URL from '../../../../base_url';

const styles = {
  bold: {
    fontFamily: 'arial',
    textAlign: 'center',
    margin: '8px 0 0 8px',
    display: 'block',
    fontSize: '20px'
  },
  btn: {
    width: '120px',
    height: '25px',
    border: '1px black solid',
    backgroundColor: 'white',
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#d6d6d6'
    }
  },
  btnGroup: {
    marginTop: '5px',
    marginBottom: '5px',
    textAlign: 'center'
  },
  input: {width: '400px'},
  show: {display: 'inline-block'},
  hide: {display: 'none'}
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
    let lastMove = JSON.parse(game.lastMove);
    let challengeUrl;

    let tipsContent;
    if (game.status === 'WAITING_FOR_OPONENT') {
      tipsContent = 'Waiting for an oponent. Challenge your friend!'
    } else if (game.status === 'WAITING_FOR_FRIEND') {
      tipsContent = 'Send this link to a friend and ask for a challenge:'
      challengeUrl = (
        <div style={styles.bold}>
          <input
            style={styles.input}
            value={`${BASE_URL}/#/challenge/${game.id}`}
            readOnly={true}
          />
        </div>
      );
    } else if (game.status === 'FINISHED') {
      if (game.winnerId === 0) {
        tipsContent = 'Draw game.'
      } else if (game.winnerId === this.props.user.id) {
        tipsContent = 'Congrats! You won!';
      } else {
        tipsContent = 'Oops... You lost.';
      }
    } else {
      tipsContent = `Next Move: ${currentMark}`;
      challengeUrl = '';
    }

    if (!board) { return (<div></div>); }

    let grid = board.grid;

    return (
      <div>
        <EnsureSession />
        <div style={styles.btnGroup}>
          <button
            key='surrenderBtn'
            style={
              [styles.btn, styles[game.status !== 'STARTED' ? 'hide' : 'show']]
            }
            onClick={this.props.surrender}
            disabled={game.status !== 'STARTED'}
          >
            SURRENDER
          </button>
        </div>
        <Board
          {...this.props}
          placeMark={this.placeMark}
          board={board}
          allowedGrid={allowedGrid}
          gameStarted={game.status === 'STARTED'}
          lastMove={lastMove}
        />
        <div style={styles.bold}>{tipsContent}</div>
        {challengeUrl}
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
