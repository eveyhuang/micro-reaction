import React, { Component } from "react";
import DataLoading from "../DataLoading";
import ThreadHistoryItem from "./ThreadHistoryItem";
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
    userEmail: this.props.userEmail,
    userId: this.props.userId,
    userThread: [],
    isThreadLoaded: false
  };

  componentWillMount() {
    this.getAllThreadsOfThisUser();
  }

  setCategories = (event, { value }) => {
    console.log(value);
    selectedCategory = value;
  };

  addThisTaskOnThread = async (postId, userAnser, taskCateg) => {
    await fb.addThisTaskOnThread(postId, userAnser, taskCateg);
  };

  submitCateg = async () => {
    this.props.setOffThreading();
    await this.addThisTaskOnThread(
      this.props.post.id,
      selectedCategory,
      "categorization"
    );
    this.props.handleSubmit(this.props.post.id, selectedCategory);
    this.props.handleClose();
    selectedCategory = [];
    this.props.scrollTo(this.props.post.id);
    this.getAllThreadsOfThisUser();
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
    this.getAllThreadsOfThisUser();
  };

  getAllThreadsOfThisUser = async () => {
    await fb.getAllThreadsOfThisUser(this.state.userId).then(threads => {
      return this.setState({ userThread: threads, isThreadLoaded: true });
    });
  };

  resetHistoryOfThisUser = async () => {
    this.setState({ userThread: [], isThreadLoaded: false }, async function() {
      await fb.resetHistoryOfThisUser();
      this.handleClose();
    });
  };

  handleClose = () => {
    this.props.handleClose();
    this.getAllThreadsOfThisUser();
  };

  render() {
    const {
      getFormattedDate,
      setOffThreading,
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
        <Button onClick={this.handleClose}>Close</Button>
      </div>
    );

    return (
      <div className="task_container">
        <div className="task_header">{threadHeader}</div>
        <div className="task_list">
          {showTask ? (
            threadContents
          ) : (
            <Header size="medium">Vote for contribution!</Header>
          )}
        </div>
        <div className="task_history">
          <Header size="medium">History of my contributions</Header>
          <div className="task_history_box">
            {this.state.isThreadLoaded ? (
              this.state.userThread.map((uThread, index) => {
                return (
                  <div key={index}>
                    <ThreadHistoryItem
                      uThread={uThread}
                      index={index}
                      getFormattedDate={getFormattedDate}
                    />
                  </div>
                );
              })
            ) : (
              <DataLoading width={"4rem"} height={"4rem"} />
            )}
          </div>
          {this.state.userThread.length > 0 ? (
            <div className="reset_button">
              <Button onClick={this.resetHistoryOfThisUser}>RESET</Button>
            </div>
          ) : this.state.isThreadLoaded ? (
            <p className="empty_history">(No history)</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Thread;
