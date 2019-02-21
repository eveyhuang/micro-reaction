import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppPost from "./AppPost";
import AppComments from "./AppComments";
import { About } from "./pages";

class AppRouted extends Component {
  render() {
    return (
      <div
        className="AppRouted_wrapper"
        style={{ width: "100%", height: "100%" }}
      >
        <Route exact path="/" component={AppPost} />
        <Route path="/:postId/:postTitle" component={AppComments} />
      </div>
    );
  }
}

export default AppRouted;
