import React, { Component } from "react";
import fb from "../utils/firebaseWrapper";
import { Link } from "react-router-dom";
import { unmountComponentAtNode } from 'react-dom';

import {
  Comment,
  Icon,
  Statistic,
  Grid,
  List,
  Header,
  Button,
  Segment
} from "semantic-ui-react";
import Iframe from "react-iframe";
import "./PostwithUpvotes.css";

export default class PostWithupvotes extends Component {
  state = {
    isAnnotated: false,
    prevOpenItBelow: false,
    openItBelow: false,
    prevIsActivePost: false,
    originalText: this.props.data.content,
    isAdmin: false
  };

  componentWillMount = () => {
    fb.isAdmin().then(value => {
      this.setState({
        isAdmin: value
      });
    });
  };

  toggleOpenItBelow = () => {
    this.setState(
      {
        openItBelow: !this.state.openItBelow
      },
      function() {
        console.log(this.state.openItBelow,this.props.data.id)
        this.props.startThreading(this.props.data.id, "toggleOpenItBelow");

      }
    );
  };

  highlight = () => {
    if (!this.state.isAnnotated && (window.getSelection().toString() !== '')) {
      var selection = window.getSelection();
      var range = selection.getRangeAt(0);
      var newNode = document.createElement("span");
      newNode.setAttribute("name", "text-highlight");
      newNode.setAttribute("style", "background-color: pink;");
      range.surroundContents(newNode);

      this.props.updateAnnotation(selection.toString());
      this.setState({isAnnotated: true});
    }
  }

  reset = () => {
    this.setState({isAnnotated: false, originalText: this.props.data.content});
    // The highlighted node from the article should be removed.
  }

  removeHighlight = () => {
    if (this.state.isAnnotated) {
      var range = document.createRange();
      var node = document.getElementsByName("text-highlight");
      console.log(node)
      if (node[0].parentNode) {
        node[0].parentNode.removeChild(node[0]);
      }
      
      this.props.updateAnnotation(null);
      this.setState({isAnnotated: false});
    }    
  }

  openSource = (openItBelow, isActivePost) => {
    console.log(openItBelow, isActivePost)
    var pIsActivePost = isActivePost;
    var pOpenItBelow = openItBelow;

    if (isActivePost === false && this.state.prevIsActivePost === true) {
      openItBelow = false
    } else if (openItBelow === true && this.state.prevOpenItBelow === false) {
      isActivePost = true
    }

    this.setState({
      prevIsActivePost: pIsActivePost,
      prevOpenItBelow: pOpenItBelow
    })

    return openItBelow && isActivePost

  }

  render() {
    const props = this.props;
    // const openSourceInNewTabButtonName = "Open Source in new tab";
    const postPage = (
      <Grid columns={2}>
        <Grid.Column width={2}>
          <List relaxed>
            <List.Item>
              <Icon
                name="angle up"
                size="large"
                onClick={() => props.handleInc(props.data.id)}
              />
            </List.Item>
            <List.Item>
              <Statistic size="mini">
                <Statistic.Value>{props.data.upvotes}</Statistic.Value>
              </Statistic>
            </List.Item>
            <List.Item>
              <Icon
                name="angle down"
                size="large"
                onClick={() => props.handleDec(props.data.id)}
              />
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={14}>
          <Comment>
            <Comment.Content>
              <Header
                className="post_title_header"
                as="h3"
                dividing
                style={{ width: "100%" }}
              >
                {props.data.title}
              </Header>
              <Comment.Text style={{ marginBottom: "0.5rem" }}>
                {props.data.content}
              </Comment.Text>
              {props.data.source ? (
                <div className="post_source_box">
                  {/*<a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${props.data.source}`}
                  >
                    <Comment.Text
                      style={{
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      {openSourceInNewTabButtonName}
                    </Comment.Text>
                    </a>*/}
                  <div
                    className="post_source_box_open_it_below"
                    onClick={() => this.toggleOpenItBelow()}
                  >
                    <Comment.Text
                      style={{
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      {this.state.openItBelow
                        ? "Close Source"
                        : "Open Source Below"}
                    </Comment.Text>
                  </div>
                </div>
              ) : null}
              {this.state.openItBelow ? (
                <Iframe
                  url={props.data.source}
                  width="100%"
                  height="450px"
                  display="initial"
                  position="relative"
                  allowFullScreen
                />
              ) : null}
              <Comment.Author>
                <text style={{ fontWeight: "bold" }}>{props.data.user}</text>
                <text style={{ opacity: "0.5" }}>
                  {` • Posted at ${props.data.createdAt}`}
                </text>
              </Comment.Author>
            </Comment.Content>
          </Comment>
        </Grid.Column>
      </Grid>
    );

    const postList = (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={1}>
            <List relaxed>
              <List.Item>
                <Icon
                  name="angle up"
                  size="large"
                  onClick={() => props.handleInc(props.data.id)}
                />
              </List.Item>
              <List.Item>
                <Statistic size="mini">
                  <Statistic.Value>{props.data.upvotes}</Statistic.Value>
                </Statistic>
              </List.Item>
              <List.Item>
                <Icon
                  name="angle down"
                  size="large"
                  onClick={() => props.handleDec(props.data.id)}
                />
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={14}>
            <Header
                className="post_title_header"
                as="h3"
                dividing
                textAlign = 'left'
                style={{ width: "100%"}}
              >
                {props.data.title}
                {props.isThisUserAuthor ? (
                  <Button
                    size="mini"
                    onClick={e => {
                      e.stopPropagation();
                      props.handleRemovePost(props.data.id);
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
            </Header>
            {this.props.data.source ? 
              (!(this.state.openItBelow && this.props.isActivePost) ? (
                <Grid columns={2}>
                <Grid.Column width={6}>
                  <Button onClick={this.toggleOpenItBelow}> Open Source </Button>
                </Grid.Column>
                <Grid.Column width={10} style={{fontWeight: "bold"}} className="rightTextAlign">
                  By {props.data.user}
                </Grid.Column>
                </Grid>
              ) : (
                <Grid columns={2}>
                <Grid.Column width={6}>
                  <Button onClick={this.toggleOpenItBelow}> Close Source </Button>
                  <Button color='red' onClick={this.removeHighlight} className='buttonPos'> RESET </Button>
                </Grid.Column>
                <Grid.Column width={10} style={{fontWeight: "bold"}} className="rightTextAlign">
                  By {props.data.user}
                </Grid.Column>
                </Grid>
              )) 
              : null}

              {/*<Comment.Author>
                <text style={{ fontWeight: "bold" }}>{props.data.user}</text>
                <text style={{ opacity: "0.5" }}>
                  {` • Posted at ${props.data.createdAt}}`}
                </text>
              </Comment.Author>
              <text style={{ opacity: "0.5" }}>
                  {` • Posted at ${props.getFormattedDate(
                    props.data.createdAt.toDate()
                  )}`}
              </text>
              */}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {this.state.openItBelow && this.props.isActivePost ? (
            <div>
              <Segment className="instrBox">
                <List bulleted>
                  <List.Item>Please drag the text to answer the question on the right panel.</List.Item>
                  <List.Item>Please press the button "RESET" to retry your annotation.</List.Item>
                </List>
              </Segment>
              <div onMouseUp={this.highlight} className="textBox">
                {this.state.originalText}
              </div>
            </div>
          ) : null}
        </Grid.Row>
      </Grid>

    );

    return props.isPostPage ? postPage : postList;
  }
}
