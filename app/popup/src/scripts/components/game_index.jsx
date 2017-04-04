import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import EnsureSession from './ensure_session';
import * as actionCreators from '../action_creators';

const styles = {
  wrapper: {
    display: 'block',
    position: 'relative',
    boxSizing: 'border-box',
    margin: '0 auto',
    width: '300px',
    height: '450px'
  },
  title: {
    fontSize: '30px',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    ':hover': {cursor: 'default'}
  },
  item: {
    width: '150px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'block',
    border: '1px solid black',
    fontSize: '15px',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    position: 'relative',
    ':hover': {
      backgroundColor: '#dbdbdb',
      cursor: 'pointer'
    }
  },
  status: {
    fontSize: '10px'
  },
  notifier: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateX(-5px) translateY(-50%)',
    width: '13px',
    height: '13px',
    backgroundColor: '#c60000',
    border: '1px solid white',
    borderRadius: '5px',
    color: 'white',
    fontSize: '10px'
  },
  show: {display: 'block'},
  hide: {display: 'none'},
  AWAITING_FOR_OPONENT: {
    // backgroundColor: ''
  },
  STARTED: {

  },
  FINISHED: {

  }
};

class GameIndex extends Component {
  constructor(props) {
    super(props);

    this.newGame = this.newGame.bind(this);
    this.openGame = this.openGame.bind(this);
  }

  componentDidMount() {
    this.props.fetchGames();
  }

  newGame() {
    this.props.createNewGame();
  }

  openGame(gameId) {
    this.props.openGame(gameId);
  }

  render() {
    let games = this.props.game.games;
    let user = this.props.user;
    let gamesIndex = [];

    for (let gameId in games) {
      let game = games[gameId];
      let oponentName;
      if (game.status === 'AWAITING_FOR_OPONENT') {
        oponentName = '...'
      } else {
        if (game.oUser.id === user.id) {
          oponentName = game.xUser.name;
        } else {
          oponentName = game.oUser.name;
        }
      }

      let isMyTurn = game.status === 'STARTED' && user.id !== game.lastMoveUserId;
      let notifierDisplay = isMyTurn ? 'show' : 'hide'

      gamesIndex.push(
        <div
          key={gameId}
          onClick={this.openGame.bind(this, gameId)}
          style={[
            styles.item,
            styles[game.status]
          ]}
        >
          vs {oponentName}
          <div style={styles.status}>{game.status}</div>
          <div style={[styles.notifier, styles[notifierDisplay]]}>!</div>
        </div>
      );
    }

    return (
      <div style={styles.wrapper}>
        <EnsureSession />
        <div style={styles.title}>SUPER tic TAC TOE</div>
        <div
          key={'new-game'}
          style={styles.item}
          onClick={this.newGame}
        >
          New Game
        </div>
        <div>
          {gamesIndex}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    user: state.user
  };
};

export default connect(mapStateToProps, actionCreators)(Radium(GameIndex));
