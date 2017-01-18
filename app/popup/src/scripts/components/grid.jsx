import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

let getGridView = function (child, index) {
  return (
    <div key={index}>
      <Board />
    </div>
  );
}

var styles = {
  base: {
    width: '20px',
    height: '20px',
    ':hover': {
      background: '#0074d9'
    },
    border: '1px solid black',
    display: 'inline-block'
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let grid = this.props.grid;
    let parentId = this.props.parentId;
    let gridComponents = [];

    for (let i = 0; i < grid.length; i++) {
      let content = null;
      let id = [parentId, i].join('-');

      if (grid[i] === null || grid[i].constructor === String) {
        content = <div style={styles.base} key={id}>{grid[i]}</div>;
      } else {
        content = <Grid key={id} grid={grid[i].grid} parentId={id} />
      }

      gridComponents.push(content);
    }

    return (
      <div onClick={this.props.clicking}>
        { gridComponents }
      </div>
    );
  }
}

export default Radium(Grid);