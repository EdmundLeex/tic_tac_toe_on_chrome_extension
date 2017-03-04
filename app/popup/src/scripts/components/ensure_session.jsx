import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../action_creators';

class EnsureSession extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.ensureSession();
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

export default connect(mapStateToProps, actions)(EnsureSession);
