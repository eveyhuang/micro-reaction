import React, { Component } from "react";
import fb from "../../utils/firebaseWrapper";
// import "./LoginBox.css";

export default class RegisterBox extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    isClickable: true
  };

  signup = async handleLogin => {
    this.setState({ isClickable: false });
    this.props.registerLoginTryingTrue();
    try {
      const { username, email, password } = this.state;
      // const { error } =
      await fb.signup(username, email, password).then(function(error) {
        console.log("error:", error);
        if (error) {
          alert(`${error.errorMessage} (CODE: ${error.error})`);
          return;
        }
        handleLogin();
      });
      this.setState({ isClickable: true });
      this.props.registerLoginTryingFalse();
      return;
      // await fb.login(email, password);
    } catch (e) {
      console.log(e);
      this.setState({ isClickable: true });
      this.props.registerLoginTryingFalse();
      return;
    }
  };

  handleButtonClick = (e, handleLogin) => {
    console.log(this.state.username, this.state.email, this.state.password);
    e.preventDefault();
    this.signup(handleLogin);
    // this.props.handleLogin();
    this.setState({ isClickable: true });
  };

  render() {
    const { handleLogin } = this.props;
    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={e => this.handleButtonClick(e, handleLogin)}
            disabled={!this.state.isClickable}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}
