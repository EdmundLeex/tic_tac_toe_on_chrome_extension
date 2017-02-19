import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    position: 'fixed',
    width: '100%',
    height: '25px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '14px'
  },
  success: {
    backgroundColor: '#5BBD66'
  },
  error: {
    backgroundColor: '#FF5F5F'
  },
  shown: {
    display: 'flex'
  },
  hidden: {
    display: 'none'
  }
};

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notification = this.props.notification;

    return (
      <div style={[
        styles.base,
        styles[notification.type],
        styles[notification.status]
      ]}>
        {notification.text}
      </div>
    );
  }
}

export default Radium(Notification);