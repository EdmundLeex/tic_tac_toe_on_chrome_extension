import React, { Component } from 'react';
import Radium from 'radium';

import Board from './board';
import Login from './login';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loggedIn = this.props.appState.loggedIn;
    const view = loggedIn ?
      <Board {...this.props} /> : <Login {...this.props} />;

    return (
      <div>
        {view}
      </div>
    );
  }
}

export default Radium(Main);