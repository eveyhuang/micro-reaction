// thread is the task interface

import React, { Component } from "react";
import DataLoading from "../DataLoading";
import ThreadHistoryItem from "./ThreadHistoryItem";
import fb from "../utils/firebaseWrapper";
import {
  Button,
  Dropdown,
  Header,
  TextArea,
  Icon,
  Form,
  Radio,
  Popup
} from "semantic-ui-react";
import Modal from "../Modal";
import CreatePost from "../CreatePost";
import classNames from "classnames";
import "./Thread.css";


// let selectedAnswer = [];

class Thread extends Component {
  state = {
    userThread: [],
    isThreadLoaded: false,
    createPost: false,
    isAdmin: false,
    selectedAnswer: "",
    reasons:""
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillMount() {
    document.removeEventListener("keydown", this.escFunction, false);
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

  escFunction = event => {
    if (event.keyCode === 27) {
      //Esc key
      this.setState({
        selectedAnswer: ""
      });
    }
  };

  setCategories = (event, { value }) => {
    this.setState({ selectedAnswer: value });
  };

  setReasons= (event, {value}) => {
    this.setState({reasons:value});
  };

  addThisTaskOnThread = async (postId, userAnswer, userReason, taskCateg) => {
    await fb.addThisTaskOnThread(postId, userAnswer, userReason, taskCateg);
  };

  submitCateg = async currentTaskId=> {
    const selectedAnswer = this.state.selectedAnswer;
    const userReasons = this.state.reasons;
    this.setState({
      selectedAnswer: "",
      reasons:"",
    });
    console.log(currentTaskId, selectedAnswer, userReasons);
    // this.props.setOffThreading();
    // await this.addThisTaskOnThread(this.props.post.id, selectedAnswer, userReasons);
    this.props.handleSubmit(this.props.post.id, currentTaskId, selectedAnswer, userReasons);
    this.props.handleClose();
    this.props.scrollTo(this.props.post.id);
    // this.getAllThreadsOfThisUser();
  };

  continueTask = async currentTaskId=> {
    const selectedAnswer = this.state.selectedAnswer;
    const userReasons = this.state.reasons;
    this.setState({
      selectedAnswer: "",
      reasons:"",
    });
    console.log(currentTaskId, selectedAnswer, userReasons);
    this.props.nextTask();
    // await this.addThisTaskOnThread(this.props.post.id, selectedAnswer, userReasons);
    this.props.handleContinue();
    this.props.handleSubmit(this.props.post.id, currentTaskId, selectedAnswer, userReasons);
    // this.props.scrollTo(this.props.post.id);
    // this.getAllThreadsOfThisUser();
  };

  getAllThreadsOfThisUser = async () => {
    // await fb.getAllThreadsOfThisUser(this.state.userId).then(threads => {
    //   return this.setState({ userThread: threads, isThreadLoaded: true });
    // });
    this.props.getAllThreadsOfThisUser();
  };

  resetHistoryOfThisUser = async () => {
    this.props.resetHistoryOfThisUser();
    this.setState(
      { userThread: [], isThreadLoaded: false, selectedAnswer: "" },
      async function() {
        await fb.resetHistoryOfThisUser();
        this.handleClose();
      }
    );
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

  handleCreatePost = async (title, body, source) => {
    this.setState({
      createPost: false
    });
    await fb.createNewPost(title, body, source).then(() => {
      this.props.updatePostsList();
    });
  };
         
  buildAnnotationAnswerBox = (credibilityTasks, currentTaskId) =>{
    console.log(this.props.annotatedText)
    if (credibilityTasks[currentTaskId].aType === "annotation"){
      if (this.props.annotatedText == null) {
        return(
          <div className="red_bold"> 
            Please drag from article. 
          </div>
        )
      }
      else{
        return (
          <div>
            Your answer is:<br/>
            <span className="text_highlight">
              {this.props.annotatedText}
            </span>
          </div>
        )
      }
    }
  };
  buildAnswerBox = (credibilityTasks, currentTaskId) => {
    if (credibilityTasks[currentTaskId].aType === "radio") {
      return (
        <div>
          <Form>
            <Form.Field>
              selected Answer: <b>{this.state.selectedAnswer}</b>
            </Form.Field>
            {credibilityTasks[currentTaskId].aOptions.map((value, index) => {
              return (
                <div key={index} className="thread-contents_radio_element">
                  <Form.Field>
                    <Radio
                      label={value}
                      name="radioGroup"
                      value={value}
                      checked={this.state.selectedAnswer === value}
                      onChange={this.setCategories}
                    />
                  </Form.Field>

                </div>
              );
            })}
          <Form.Field control={TextArea} 
          label= 'Why (Optional)'
          value={this.state.reasons || ''}
          placeholder='What is your reasoning behind your answer?'
          onChange={this.setReasons}/>
          </Form>
        </div>
      );
    }

  };

  viewOthersAnswerbox = (currentTaskId) => {
    var allAnswers = this.props.getAnswers(this.props.curPost, currentTaskId);
    console.log(allAnswers)

  }

  render() {
    const {
      nextTask,
      credibilityTasks,
      currentTaskId,
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
      categ,
      annotatedText
    } = this.props;

    const threadHeader = (
      <div className="thread-header_container">
        <div
          className={`thread-header_wrapper${
            isPostPage || !this.state.isAdmin ? "_postpage" : ""
          }`}
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
        {isPostPage || !this.state.isAdmin ? null : (
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
            <div>
              <p>{`(${currentTaskId + 1}/${credibilityTasks.length})`}</p>
            </div>
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
            {credibilityTasks[currentTaskId].qDesc ? (
              <Popup
                trigger={
                  <p className="thread-contents_task_question">{`${
                    credibilityTasks[currentTaskId].tQ
                  }`}</p>
                }
                content={credibilityTasks[currentTaskId].qDesc}
                size="large"
                position="top center"
              />
            ) : (
              <p className="thread-contents_task_question">{`${
                credibilityTasks[currentTaskId].tQ
              }`}</p>
            )}
            {/*<p className="thread-contents_task_question_post_title">
              {`Title: ${post.title}`}
          </p>*/}
          </div>
        </div>
        {/*  <div className="thread-contents_task_post">
          <p> {post.title} </p>
          <p> {post.author}</p>
          <p> {post.content} </p>
        </div>*/}
        {this.buildAnswerBox(credibilityTasks, currentTaskId)}
        {this.buildAnnotationAnswerBox(credibilityTasks, currentTaskId)}
        {/* {this.viewOthersAnswerbox(currentTaskId)} */}
        <div className="thread-contents_button_box">
          
          {this.props.isTaskOver ? (
            <div>
            <Button
            onClick={() =>
              this.submitCateg(currentTaskId)
            }
            >
            Submit
            </Button>
            <Button color='red' onClick={this.props.removeHighlight}> RESET </Button>
            </div>
          ) : (
            <div>
            <Button
              onClick={() =>
                this.continueTask(currentTaskId)
              }
            >
              Submit
            </Button>
            <Button color='red' onClick={this.props.removeHighlight}> RESET </Button>
            </div>
          )}
        </div>
      </div>
    );

    const historyList = this.state.userThread.reverse();
    // console.log("historyList:", historyList);

    return (
      <div className="task_container">
        <div className="task_header">{threadHeader}</div>
        {showTask ? (
          <div className="task_list">
            {threadContents}
            
          </div>
        ) : null}
        {this.state.isAdmin ? (
          <div className="task_history">
            <Header size="medium">History of your contributions</Header>
            {this.state.isThreadLoaded ? (
              historyList.length > 0 ? (
                <div className="task_history_box">
                  {historyList.map((uThread, index) => {
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
