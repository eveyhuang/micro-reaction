import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Container,
  Header,
  Message
} from "semantic-ui-react";
import "./ThreadHistoryItem.css";

let selectedCategory = [];

class ThreadHistoryItem extends Component {
  state = {
    isThreadOpen: false
  };

  handleThreadClick = () => {
    this.setState({ isThreadOpen: !this.state.isThreadOpen });
  };

  render() {
    const { uThread, index, getFormattedDate } = this.props;
    return (
      <div className="this_thread_wrapper">
        <div className="this_thread_title" onClick={this.handleThreadClick}>
          <h3>{`${uThread.tOrder + 1}: ${getFormattedDate(
            uThread.threadId.toDate()
          )}`}</h3>
        </div>
        {this.state.isThreadOpen
          ? uThread.thread.map((task, index) => {
              return (
                <div className="this_task_wrapper" key={index}>
                  <p>{getFormattedDate(task.doneAt.toDate())}</p>
                  <p>{task.postId}</p>
                  <p>{task.taskCateg}</p>
                  <p>{task.userAns}</p>
                  <br />
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default ThreadHistoryItem;
