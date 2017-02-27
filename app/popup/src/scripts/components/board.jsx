import React, { Component } from 'react';
import Radium from 'radium';

import Grid from './grid';

const styles = {
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
    let board = this.props.board;
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

export default Radium(Board);