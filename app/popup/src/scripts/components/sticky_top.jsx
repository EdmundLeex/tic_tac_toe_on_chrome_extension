import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import * as actions from '../action_creators';

let styles = {
  base: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: '20px',
    display: 'block',
    backgroundColor: 'green'
  },
  logout: {
    float: 'right'
  }
};

class StickyTop extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <div style={styles.base}>
        <div
          style={styles.logout}
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
