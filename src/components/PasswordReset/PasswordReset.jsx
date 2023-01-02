import Userfront from "@userfront/core";
import React from "react";

// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the Password reset form component
class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordVerify: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      return;
    }
    // Call Userfront.resetPassword()
    Userfront.resetPassword({
      password: this.state.password,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Re-type password
            <input
              name="passwordVerify"
              type="password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Reset password</button>
        </form>
      </div>
    );
  }
}

export default PasswordReset;