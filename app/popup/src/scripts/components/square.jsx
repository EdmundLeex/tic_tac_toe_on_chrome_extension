import React, { Component } from 'react';
import Radium from 'radium';

let styles = {
  grid: {
    width: 'calc(100% / 3)',
    height: 'calc(100% / 3)',
    border: '1px solid black',
    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
    float: 'left',
    ':hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer'
    }
  },
  empty: {backgroundColor: '#4c4c4c'},
  taken: {backgroundColor: 'white'},
  mark: {
    fontSize: '20px',
    fontFamily: 'impact',
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  x: {color: '#cc0000'},
  o: {color: '#00cc00'}
}

class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id={this.props.id}
        style={[
          styles.grid,
          this.props.mark === null ? styles.empty : styles.taken
        ]}
        onClick={this.props.placeMark}
      >
        <div
          style={[
            styles.mark,
            styles[this.props.mark]
          ]}
        >
          {this.props.mark}
        </div>
      </div>
    );
  }
}

export default Radium(Square);