import React, { Component } from 'react';
import Radium from 'radium';

import EnsureLoggedIn from './ensure_logged_in';

const styles = {
  
};

class Home extends Component {
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
        <EnsureLoggedIn />
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

export default Radium(Home);