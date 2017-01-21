import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from './grid';

var styles = {
  board: {
    width: '450px',
    height: '450px',
    border: '5px solid #000',
    display: 'block',
    boxSizing: 'border-box',
    paddingTop: '0',
    margin: '0 auto'
  }
};

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let game = this.props.game;
    let board = game.board ? game.board : null;

    if (!board) { return (<div></div>); }

    let grid = board.grid;

    return (
      <div style={styles.board}>
        <Grid
          {...this.props}
          grid={grid}
          parentId={'grid'}
        />
      </div>
    );
  }
}

export default Board;