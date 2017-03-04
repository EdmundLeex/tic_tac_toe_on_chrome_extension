import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ensureLoggedIn } from '../action_creators';

class EnsureLoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ensureLoggedIn();
  }

  render() {
    return (<div></div>);
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

export default connect(mapStateToProps, ensureLoggedIn)(EnsureLoggedIn);
