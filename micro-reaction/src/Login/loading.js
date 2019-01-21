import React, { Component } from "react";
import "./loading.css"

export default class RegisterBox extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-wrapper">
          <img
            src={require("../assets/icons/giphy.gif")}
            alt="checking autologin"
          />
        </div>
      </div>
    );
  }
}
