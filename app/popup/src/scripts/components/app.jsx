import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'MAKE_MOVE'
      });
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        { this.props.game.players.currentPlayer.mark }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

export default connect(mapStateToProps)(App);
// export default App