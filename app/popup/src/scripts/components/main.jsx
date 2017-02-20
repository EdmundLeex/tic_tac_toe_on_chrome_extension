import React, { Component } from 'react';
import Radium from 'radium';

import Board from './board';
import Login from './login';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const view = this.props.loggedIn ?
      <Board {...this.props} /> : <Login {...this.props} />;

    return (
      <div>
        {view}
      </div>
    );
  }
}

export default Radium(Main);