import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

import fbIcon from '../../../../img/fb_icon.png';

const styles = {
  btn: {
    width: '100%',
    height: '35px',
    marginTop: '15px',
    borderRadius: '2px',
    border: '0',
    fontSize: '15px',
    backgroundColor: '#4A6EA9',
    display: 'flex',
    ':hover': {cursor: 'pointer'}
  },
  btnText: {
    color: '#ffffff',
    display: 'block',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '0',
    marginRight: '0'
  }
};

class FbLoginBtn extends Component {
  constructor(props) {
    super(props);

    this.fbLogin = this.fbLogin.bind(this);
  }

  fbLogin(e) {
    this.props.fbLogin();
  }

  render() {
    return (
      <div
        key="fb-btn"
        onClick={this.fbLogin}
        style={styles.btn}
      >
        <div style={styles.btnText}><img src={fbIcon} /></div>
        <div style={styles.btnText}>{this.props.text} with Facebook</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, actionCreators)(Radium(FbLoginBtn));
