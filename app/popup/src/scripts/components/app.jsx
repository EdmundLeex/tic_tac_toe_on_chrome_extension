import React, { Component } from 'react';
import { connect } from 'react-redux';

import Board from './board';

class App extends Component {
  constructor(props) {
    super(props);

    this.clicking = this.clicking.bind(this);
  }

  clicking(e) {
    console.log('clicked');
    debugger;
  }

  // componentDidMount() {
  //   document.addEventListener('click', (e) => {
  //     debugger;
  //     this.props.dispatch({
  //       type: 'MAKE_MOVE',
  //       payload: 2
  //     });
  //   });
  // }

  render() {
    return (
      <div>
        <Board onClick={this.clicking} {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let game = state.game ? state.game.game : {}
  return {
    game: game
  };
};

export default connect(mapStateToProps)(App);
