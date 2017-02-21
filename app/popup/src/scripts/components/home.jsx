import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.newGame = this.newGame.bind(this);
  }

  newGame() {
    this.props.createNewGame();
  }

  render() {
    return (
      <div style={styles.base}>
        <div
          onClick={this.newGame}
        >
          New Game
        </div>
      </div>
    );
  }
}

export default Radium(Home);