import React, { Component } from 'react';
import Radium from 'radium';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.props.onSignInFormChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSignInFormSubmit();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type='text' name='email' onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type='text' name='password' onChange={this.handleChange} />
          </label>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

export default Radium(SignIn);