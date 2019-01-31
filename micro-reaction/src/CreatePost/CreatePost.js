import React, { Component } from "react";
import { MdClose as CloseIcon } from "react-icons/md";
import { Button } from "semantic-ui-react";
import "./CreatePost.css";

class CreatePost extends Component {
  state = {
    title: "",
    body: ""
  };

  handleTitleInput = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleBodyInput = e => {
    this.setState({
      body: e.target.value
    });
  };

  render() {
    const { onClose, onCreate } = this.props;
    // console.log("Modal state:", this.state);
    return (
      <div className="CreatePost">
        <div className="dark" onClick={onClose} />
        <div className="modal">
          <div className="head">
            <h3>Create New Post</h3>
            <div className="exit">
              <CloseIcon onClick={onClose} />
            </div>
          </div>
          <textarea
            rows={1}
            placeholder="title"
            value={this.state.title}
            onChange={e => {
              this.handleTitleInput(e);
            }}
          />
          <textarea
            rows={4}
            placeholder="What are you thinking now?"
            value={this.state.body}
            onChange={e => {
              this.handleBodyInput(e);
            }}
          />
          <div className="right">
            <Button
              theme="outline"
              onClick={() => {
                onCreate(this.state.title, this.state.body);
              }}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
