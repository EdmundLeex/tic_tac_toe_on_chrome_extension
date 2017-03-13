import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import EnsureSession from './ensure_session';
import * as actionCreators from '../action_creators';

const styles = {
  
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
        >
          {games[gameId].status}
        </div>
      );
    }

    return (
      <div style={styles.base}>
        <EnsureSession />
        <div onClick={this.newGame}>
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