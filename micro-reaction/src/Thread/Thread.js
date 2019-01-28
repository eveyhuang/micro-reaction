import React, { Component } from "react";
import "./Thread.css";

class Thread extends Component {
  state = {
    userName: this.props.userName,
    userEmail: this.props.userEmail
  };

  render() {
    const threadHeader = (
      <div className="thread-header">
        <div className="thread-header_userProfile">
          <img
            className="thread-header_userProfile_img"
            src={require("../assets/icons/user.png")}
            alt="user profile"
          />
        </div>
        <div className="thread-header_userInfo">
          <div className="thread-header_userInfo_userName">
            {this.state.userName}
          </div>
          <div className="thread-header_userInfo_userEmail">
            {this.state.userEmail}
          </div>
        </div>
      </div>
    );

    const threadContents = (
      <div className="thread-contents">"threadContents"</div>
    );

    return (
      <div className="task_container">
        <div className="task_header">{threadHeader}</div>
        <div className="task_list">{threadContents}</div>
      </div>
    );
  }
}

export default Thread;
