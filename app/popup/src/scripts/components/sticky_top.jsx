import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import * as actions from '../action_creators';

let styles = {
  wrapper: {
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    display: 'flex',
    boxSizing: 'border-box',
    marginLeft: '5px',
    marginRight: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    height: '25px'
  },
  left: {
    width: '15%',
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  middle: {
    width: '70%',
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  right: {
    width: '15%',
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  show: {display: 'block'},
  hide: {display: 'none'}
};

class StickyTop extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  goBack() {
    this.props.changeViewTo('gameIndex');
  }

  render() {
    const showBackBtn = this.props.appState.currentView !== 'gameIndex' ? 'show' : 'hide';

    return (
      <div style={styles.wrapper}>
        <div
          style={[
            styles.left
          ]}
          onClick={this.goBack}
        >
          <span style={styles[showBackBtn]}>{'<Back'}</span>
        </div>
        <div
          style={styles.middle}
        >

        </div>
        <div
          style={styles.right}
          onClick={this.logout}
        >
          Logout
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

export default connect(mapStateToProps, actions)(Radium(StickyTop));
