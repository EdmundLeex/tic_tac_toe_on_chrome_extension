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
  cell: {
    width: '20px',
    height: '20px',
    ':hover': {
      background: '#0074d9'
    },
    border: '1px solid black',
    display: 'inline-block'
  },
  grid: {
    width: '70px',
    height: '70px',
    display: 'inline-block'
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);

    this.placeMark = this.placeMark.bind(this);
  }

  stripPosFromId(id) {
    return id.split('-').splice(1).map(id => Number(id));
  }

  placeMark(e) {
    console.log('placed mark')
    let pos = this.stripPosFromId(e.target.id);
    this.props.makeMove(pos);
  }

  render() {
    let grid = this.props.grid;
    let parentId = this.props.parentId;
    let gridComponents = [];

    for (let i = 0; i < grid.length; i++) {
      let content = null;
      let id = [parentId, i].join('-');

      if (grid[i] === null || grid[i].constructor === String) {
        content = <div
                    id={id}
                    key={id}
                    style={styles.cell}
                    onClick={this.placeMark}
                  >
                    {grid[i]}
                  </div>;
      } else {
        content = <div style={styles.grid}>
                    <Grid
                      {...this.props}
                      key={id}
                      grid={grid[i].grid}
                      parentId={id}
                    />
                  </div>
      }

      gridComponents.push(content);
    }

    return (
      <div>
        { gridComponents }
      </div>
    );
  }
}

export default Radium(Grid);