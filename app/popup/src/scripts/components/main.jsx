import React, { Component } from 'react';
import Radium from 'radium';

import Board from './board';
import Login from './login';
import SignUp from './sign_up';
import Home from './home';
import LoadingOverlay from './loading_overlay';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    let currentView = this.props.appState.currentView;
    // currentView = 'home';

    switch (currentView) {
      case 'game':
        view = <Board {...this.props} />;
        break;
      case 'login':
        view = <Login {...this.props} />;
        break;
      case 'signUp':
        view = <SignUp {...this.props} />;
        break;
      case 'loadingOverlay':
        view = <LoadingOverlay />;
        break;
      case 'home':
        view = <Home {...this.props} />
        break;
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