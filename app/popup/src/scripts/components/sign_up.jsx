import React, { Component } from 'react';
import Radium from 'radium';

import FbLoginBtn from './fb_login_btn';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '400px'
  },
  form: {
    alignSelf: 'center',
    width: '200px'
  },
  fields: {
    width: '100%',
    height: '35px',
    boxSizing: 'border-box',
    display: 'block',
    fontSize: '15px',
    marginTop: '15px',
    borderRadius: '2px'
  },
  btn: {
    width: '100%',
    height: '35px',
    marginTop: '15px',
    color: '#ffffff',
    backgroundColor: 'black',
    borderRadius: '2px',
    border: '0',
    fontSize: '15px',
    ':hover': {cursor: 'pointer'}
  },
  txtCenter: {
    textAlign: 'center'
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.naviToLogin = this.naviToLogin.bind(this);
  }

  naviToLogin(e) {
    e.preventDefault();
    this.props.changeViewTo('login');
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.props.onSignUpFormChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSignUpFormSubmit();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.form}>
          <form onSubmit={this.handleSubmit}>
            <input
              style={styles.fields}
              type='text'
              name='email'
              placeholder='Email'
              onChange={this.handleChange}
            />
            <input
              style={styles.fields}
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <input
              style={styles.fields}
              type='password'
              name='passwordConf'
              placeholder='Confirm Password'
              onChange={this.handleChange}
            />
            <input
              key='signup-btn'
              style={styles.btn}
              type="submit"
              value="Sign up"
            />
            <FbLoginBtn text='Sign up' />
          </form>
          <p style={styles.txtCenter}>
            {"Already have an account? "}
            <a href='#' onClick={this.naviToLogin}>Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Radium(SignUp);