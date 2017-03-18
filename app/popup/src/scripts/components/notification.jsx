import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

const styles = {
  base: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    height: '25px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '14px',
    zIndex: '999'
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Radium(Notification));
