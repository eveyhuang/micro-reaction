import React, { Component } from "react";
import fb from "../utils/firebaseWrapper";
import {
  Button,
  Dropdown,
  Container,
  Header,
  Message
} from "semantic-ui-react";
import "./Thread.css";

let selectedCategory = [];

class Thread extends Component {
  state = {
    userName: this.props.userName,
    userEmail: this.props.userEmail
  };

  setCategories = (event, { value }) => {
    console.log(value);
    selectedCategory = value;
  };

  addThisTaskOnThread = async (postId, userAnser, taskCateg) => {
    // await fb.addThisTaskOnThread(postId, userAnser, taskCateg);
  };

  submitCateg = async () => {
    await this.addThisTaskOnThread(
      this.props.post.id,
      selectedCategory,
      "categorization"
    );
    this.props.handleSubmit(this.props.post.id, selectedCategory);
    this.props.handleClose();
    selectedCategory = [];
    this.props.scrollTo(this.props.post.id);
  };

  continueTask = async () => {
    await this.addThisTaskOnThread(
      this.props.post.id,
      selectedCategory,
      "categorization"
    );
    this.props.handleContinue();
    this.props.handleSubmit(this.props.post.id, selectedCategory);
    selectedCategory = [];
    this.props.scrollTo(this.props.post.id);
  };

  render() {
    const {
      scrollTo,
      showTask,
      handleSubmit,
      handleClose,
      handleContinue,
      post,
      categ
    } = this.props;
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
      <div className="thread-contents">
        <div
          onClick={() => {
            scrollTo(post.id);
          }}
          style={{ cursor: "pointer" }}
        >
          <Header size="medium">Would you help to categorize this post?</Header>
          <p> {post.title} </p>
        </div>
        {/*  <div className="thread-contents_task_post">
          <p> {post.title} </p>
          <p> {post.author}</p>
          <p> {post.content} </p>
        </div>*/}
        <Dropdown
          className="thread-contents_dropdown"
          placeholder="Categories"
          fluid
          multiple
          selection
          closeOnChange
          options={categ}
          onChange={this.setCategories}
        />
        <Button onClick={this.submitCateg}>Submit and Exit</Button>
        <Button onClick={this.continueTask}>Submit and Continue</Button>
        <Button onClick={handleClose}>Close</Button>
      </div>
    );

    const threadHistory = <div>threadHistory</div>;

    return (
      <div className="task_container">
        <div className="task_header">{threadHeader}</div>
        <div className="task_list">
          {showTask ? (
            threadContents
          ) : (
            <Header size="medium">Vote for contribution</Header>
          )}
        </div>
        <div className="task_history">{threadHistory}</div>
      </div>
    );
  }
}

export default Thread;
