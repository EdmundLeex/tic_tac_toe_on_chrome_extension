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
    paddingLeft: '10px',
    paddingRight: '10px',
    height: '35px',
    backgroundColor: '#FAFAFB',
    borderBottom: '1px solid #dbdbdb'
  },
  side: {
    width: '15%',
    margin: 'auto'
  },
  middle: {
    width: '70%',
    margin: 'auto'
  },
  hide: {display: 'none'},
  btnWrapper: {
    textAlign: 'center',
    display: 'flex',
    height: '100%',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#EFF0F1'
    }
  },
  btnText: {
    display: 'block',
    textAlign: 'center',
    margin: 'auto'
  }
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
    const showBackBtn = this.props.appState.currentView === 'game' ? 'btnWrapper' : 'hide';
    const showLogoutBtn = this.props.appState.loggedIn ? 'btnWrapper' : 'hide';

    return (
      <div style={styles.wrapper}>
        <div
          key={'goback-btn'}
          style={[
            styles.side,
            styles[showBackBtn]
          ]}
          onClick={this.goBack}
        >
          <div style={[
            styles.btnText
          ]}>
            {'< Back'}
          </div>
        </div>
        <div
          style={[styles.middle]}
        >

        </div>
        <div
          key={'logout-btn'}
          style={[styles.side, styles[showLogoutBtn]]}
          onClick={this.logout}
        >
          <div style={styles.btnText}>Logout</div>
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
