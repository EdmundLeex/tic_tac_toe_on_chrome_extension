import React, { Component } from 'react';
import Radium from 'radium';

import Square from './square';

function stripPosFromId(id) {
  return id.split('-').splice(1).map(id => Number(id));
}

var styles = {
  base: {
    width: '100%',
    height: '100%',
  },
  grid: {
    width: 'calc(100% / 3)',
    height: 'calc(100% / 3)',
    border: '3px solid black',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    float: 'left',
    ':hover': {
      cursor: 'pointer'
    }
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);

    this.placeMark = this.placeMark.bind(this);
  }

  placeMark(e) {
    let pos = stripPosFromId(e.target.id);
    this.props.placeMark(pos);
  }

  render() {
    let grid = this.props.grid;
    let parentId = this.props.parentId;
    let gridComponents = [];

    for (let i = 0; i < grid.length; i++) {
      let content = null;
      let id = [parentId, i].join('-');

      if (grid[i] === null || grid[i].constructor === String) {
        content = <Square
                    key={id}
                    placeMark={this.placeMark}
                    mark={grid[i]}
                  />
      } else {
        content = <div key={id} style={styles.grid}>
                    <Grid
                      {...this.props}
                      grid={grid[i].grid}
                      style={styles.base}
                      parentId={id}
                    />
                  </div>
      }

      gridComponents.push(content);
    }

    let style = this.props.style || styles.base;

    return (
      <div style={style}>
        { gridComponents }
      </div>
    );
  }
}

export default Radium(Grid);