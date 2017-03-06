import React, { Component } from 'react';
import Radium from 'radium';

import Game from './game';
import Login from './login';
import SignUp from './sign_up';
import GameIndex from './game_index';
import LoadingOverlay from './loading_overlay';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    let currentView = this.props.appState.currentView;

    switch (currentView) {
      case 'game':
        view = <Game {...this.props} />;
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
      case 'gameIndex':
        view = <GameIndex {...this.props} />
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