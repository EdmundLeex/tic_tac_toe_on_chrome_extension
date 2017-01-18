import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from './grid';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let game = this.props.game;
    let board = game.board ? game.board : null;

    if (!board) { return (<div></div>); }

    let grid = board.grid;
debugger;
    return (
      <div>
        <Grid {...this.props} grid={grid} parentId={'grid'} />
      </div>
    );
  }
}

export default Board;