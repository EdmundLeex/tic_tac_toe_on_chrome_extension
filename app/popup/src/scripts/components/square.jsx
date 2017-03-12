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
    float: 'left'
  },
  allowed: {
    backgroundColor: '#999999',
    transform: 'translateX(-4px) translateY(-4px)',
    transition: 'all 100ms ease-in',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.8)',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'lightgray'
    }
  },
  notAllowed: {},
  empty: {backgroundColor: '#4c4c4c'},
  taken: {
    backgroundColor: 'white'
  },
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
    let isTaken = this.props.mark !== null;
    let isAllowed = this.props.isAllowed && !isTaken;

    return (
      <div
        id={this.props.id}
        style={[
          styles.grid,
          isTaken   ? styles.taken   : styles.empty,
          isAllowed ? styles.allowed : styles.notAllowed
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