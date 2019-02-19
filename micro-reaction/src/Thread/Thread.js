import React, { Component } from "react";
import DataLoading from "../DataLoading";
import ThreadHistoryItem from "./ThreadHistoryItem";
import fb from "../utils/firebaseWrapper";
import {
  Button,
  Dropdown,
  Container,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import Modal from "../Modal";
import CreatePost from "../CreatePost";
import classNames from "classnames";
import "./Thread.css";

let selectedCategory = [];

class Thread extends Component {
  state = {
    userThread: [],
    isThreadLoaded: false,
    createPost: false,
    isAdmin: false
  };

  componentWillMount() {
    this.getAllThreadsOfThisUser();
    fb.isAdmin().then(value => {
      this.setState({
        isAdmin: value
      });
    });
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      userThread: nextProps.userThread ? nextProps.userThread : [],
      isThreadLoaded: nextProps.isThreadLoaded
        ? nextProps.isThreadLoaded
        : false
    });
  };

  setCategories = (event, { value }) => {
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
    this.props.nextTask();
    await this.addThisTaskOnThread(
      this.props.post.id,
      selectedCategory,
      "categorization"
    );
    this.props.handleContinue();
    this.props.handleSubmit(this.props.post.id, selectedCategory);
    selectedCategory = [];
    // this.props.scrollTo(this.props.post.id);
    this.getAllThreadsOfThisUser();
  };

  getAllThreadsOfThisUser = async () => {
    // await fb.getAllThreadsOfThisUser(this.state.userId).then(threads => {
    //   return this.setState({ userThread: threads, isThreadLoaded: true });
    // });
    this.props.getAllThreadsOfThisUser();
  };

  resetHistoryOfThisUser = async () => {
    this.props.resetHistoryOfThisUser();
    this.setState({ userThread: [], isThreadLoaded: false }, async function() {
      await fb.resetHistoryOfThisUser();
      this.handleClose();
    });
  };

  handleClose = () => {
    this.props.handleClose();
    this.getAllThreadsOfThisUser();
  };

  handleToggleCreatePost = () => {
    this.setState({
      createPost: !this.state.createPost
    });
  };

  handleCreatePost = async (title, body) => {
    this.setState({
      createPost: false
    });
    await fb.createNewPost(title, body).then(() => {
      this.props.updatePostsList();
    });
  };

  render() {
    const {
      tQ,
      isTaskOver,
      isPostPage,
      updatePostsList,
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
      <div className="thread-header_container">
        <div
          className={`thread-header_wrapper${isPostPage ? "_postpage" : ""}`}
        >
          <div className="thread-header_userProfile">
            <img
              className="thread-header_userProfile_img"
              src={require("../assets/icons/user.png")}
              alt="user profile"
            />
          </div>
          {this.props.user.name ? (
            <div className="thread-header_userInfo">
              <div className="thread-header_userInfo_userName">
                {this.props.user.name}
              </div>
              <div className="thread-header_userInfo_userEmail">
                {this.props.user.email}
              </div>
            </div>
          ) : (
            <DataLoading width={"4rem"} height={"4rem"} />
          )}
        </div>
        {isPostPage ? null : (
          <div className="thread-header_modal_wrapper">
            <div
              className="thread-header_create_post_wrapper"
              onClick={this.handleToggleCreatePost}
            >
              <div className="thread-header_create_post_text">
                <text>CREATE POST</text>
              </div>
            </div>
            {this.state.createPost && (
              <CreatePost
                onClose={this.handleToggleCreatePost}
                onCreate={this.handleCreatePost}
              />
            )}
          </div>
        )}
      </div>
    );

    const threadContents = (
      <div className="thread-contents">
        <div>
          <div className="thread-contents_cancel_button_box">
            <div className="thread-contents_cancel_button">
              <Icon name="close" size="large" onClick={this.handleClose} />
            </div>
          </div>
          <div
            className="thread-contents_task_wrapper"
            onClick={() => {
              scrollTo(post.id);
            }}
          >
            <p className="thread-contents_task_question">{`${tQ}`}</p>
            <p className="thread-contents_task_question_post_title">
              {`Title: ${post.title}`}
            </p>
          </div>
        </div>
        {/*  <div className="thread-contents_task_post">
          <p> {post.title} </p>
          <p> {post.author}</p>
          <p> {post.content} </p>
        </div>*/}
        <Dropdown
          className="thread-contents_dropdown"
          placeholder="Answer"
          fluid
          multiple
          selection
          closeOnChange
          options={categ}
          onChange={this.setCategories}
        />
        <div className="thread-contents_button_box">
          <Button onClick={this.submitCateg}>Submit & Exit</Button>
          {isTaskOver ? null : (
            <Button onClick={this.continueTask}>Submit & Continue</Button>
          )}
        </div>
        {/*<Button onClick={this.handleClose}>Close</Button>*/}
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
        {this.state.isAdmin ? (
          <div className="task_history">
            <Header size="medium">History of your contributions</Header>
            {this.state.isThreadLoaded ? (
              this.state.userThread.length > 0 ? (
                <div className="task_history_box">
                  {this.state.userThread.map((uThread, index) => {
                    return (
                      <div key={index}>
                        <ThreadHistoryItem
                          uThread={uThread}
                          index={index}
                          getFormattedDate={getFormattedDate}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="empty_history">(No history)</p>
              )
            ) : (
              <DataLoading width={"4rem"} height={"4rem"} />
            )}

            {this.state.userThread.length > 0 ? (
              <div className="reset_button">
                <Button onClick={this.resetHistoryOfThisUser}>RESET</Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Thread;
