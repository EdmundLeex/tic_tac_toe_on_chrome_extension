import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import EnsureSession from './ensure_session';
import * as actionCreators from '../action_creators';

const styles = {
  base: {
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
    width: '120px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'block',
    border: '1px solid black',
    fontSize: '15px',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    ':hover': {
      backgroundColor: '#dbdbdb',
      cursor: 'pointer'
    }
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
    let gamesIndex = [];

    for (let gameId in games) {
      gamesIndex.push(
        <div
          key={gameId}
          onClick={this.openGame.bind(this, gameId)}
          style={styles.item}
        >
          {games[gameId].status}
        </div>
      );
    }

    return (
      <div style={styles.base}>
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
    game: state.game
  };
};

export default connect(mapStateToProps, actionCreators)(Radium(GameIndex));
