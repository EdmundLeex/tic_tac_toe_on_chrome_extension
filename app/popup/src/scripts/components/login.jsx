import React, { Component } from 'react';
import Radium from 'radium';

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
    height: '28px',
    boxSizing: 'border-box',
    display: 'block',
    fontSize: '15px',
    marginTop: '15px',
    borderRadius: '2px'
  },
  btn: {
    width: '100%',
    height: '28px',
    marginTop: '15px',
    color: '#ffffff',
    backgroundColor: 'black',
    borderRadius: '2px',
    border: '0',
    fontSize: '15px'
  },
  txtCenter: {
    textAlign: 'center'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.naviToSignUp = this.naviToSignUp.bind(this);
    this.fbLogin = this.fbLogin.bind(this);
  }

  naviToSignUp(e) {
    e.preventDefault();
    this.props.changeViewTo('signUp');
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.props.onLoginFormChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLoginFormSubmit();
  }

  fbLogin(e) {
    this.props.fbLogin();
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
              value={this.props.login.email}
            />
            <input
              style={styles.fields}
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <input
              style={styles.btn}
              type="submit"
              value="Login"
            />
            <div onClick={this.fbLogin}>
              Login with Facebook
            </div>
          </form>
          <p style={styles.txtCenter}>
            {"Don't have an account? "}
            <a href='#' onClick={this.naviToSignUp}>Sign up</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Radium(Login);