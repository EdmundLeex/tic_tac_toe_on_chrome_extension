import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'MAKE_MOVE',
        payload: 2
      });
    });
  }

  render() {
    let game = this.props.game;
    console.log(game)
    let mark = game.currentPlayer ? game.currentPlayer.mark : '';
    return (
      <div>
        { mark }
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
