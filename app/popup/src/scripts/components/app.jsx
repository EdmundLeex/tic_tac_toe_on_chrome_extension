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
    let count = this.props.game ? this.props.game.count : 0;
    return (
      <div>
        { count }
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