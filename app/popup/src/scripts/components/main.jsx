import React, { Component } from 'react';
import Radium from 'radium';

import Board from './board';
import Login from './login';
import SignUp from './sign_up';
import LoadingOverlay from './loading_overlay';

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
      case 'loadingOverlay':
        view = <LoadingOverlay />;
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