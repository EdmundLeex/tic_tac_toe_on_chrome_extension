import React, { Component } from 'react';
import Radium from 'radium';

import Board from './board';
import Login from './login';
import SignUp from './sign_up';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    const currentView = this.props.appState.currentView;

    switch (currentView) {
      case 'game':
        view = <Board {...this.props} />;
        break;
      case 'login':
        view = <Login {...this.props} />;
        break;
      case 'signUp':
        view = <SignUp {...this.props} />;
      default:
        break; 
    }

    return (
      <div>
        {view}
      </div>
    );
  }
}

export default Radium(Main);