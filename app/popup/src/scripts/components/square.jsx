import React, { Component } from 'react';
import Radium from 'radium';

let styles = {
  base: {
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
  notAllowed: {
    ':hover': {
      cursor: 'default'
    }
  },
  lastMove: {backgroundColor: '#8e8e8e'},
  taken: {backgroundColor: 'white'},
  empty: {backgroundColor: '#4c4c4c'},
  mark: {
    fontSize: '20px',
    fontFamily: 'impact',
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  x: {color: '#cc0000'},
  o: {color: '#00cc00'},
  xWinner: {backgroundColor: '#E78282'},
  oWinner: {backgroundColor: '#82E782'}
}

class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let hasWinner = this.props.winner;
    let isTaken = this.props.mark !== null;
    let isAllowed = this.props.isAllowed &&
                    !isTaken &&
                    this.props.gameStarted;
    let lm, lmInId, isLastMove;
    if (this.props.lastMove) {
      lm = this.props.lastMove.map(String);
      lmInId = this.props.id.split('-').slice(1);
      isLastMove = (lm[0] === lmInId[0] && lm[1] === lmInId[1]);
    }

    return (
      <div
        id={this.props.id}
        style={[
          styles.base,
          isTaken ? styles.taken : styles.empty,
          styles[`${this.props.winner}Winner`],
          isAllowed ? styles.allowed : styles.notAllowed,
          isLastMove ? styles.lastMove : {}
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