import React, { Component } from "react";
import "./DataLoading.css";

export default class DataLoading extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <div className="data-loading-container">
        <div className="data-loading-wrapper">
          <img
            src={require("../assets/icons/giphy3.gif")}
            alt="loading data"
            style={{
              width: width ? width : "8rem",
              height: height ? height : "8rem"
            }}
          />
        </div>
      </div>
    );
  }
}
