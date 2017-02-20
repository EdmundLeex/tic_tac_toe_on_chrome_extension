import React, { Component } from 'react';
import Radium from 'radium';

import spinner from '../../../../img/spinner.gif';

const styles = {
  base: {
    position: 'fixed',
    width: '100%',
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: '999'
  },
  img: {
    alignSelf: 'center'
  }
};

class LoadingOverlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.base}>
        <div style={styles.img}>
          <img src={spinner} />
        </div>
      </div>
    );
  }
}

export default Radium(LoadingOverlay);