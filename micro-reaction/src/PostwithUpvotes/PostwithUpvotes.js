import React, { Component } from "react";
import fb from "../utils/firebaseWrapper";
import { Link } from "react-router-dom";
import {
  Comment,
  Icon,
  Statistic,
  Grid,
  List,
  Header,
  Button,
  Modal
} from "semantic-ui-react";
import Iframe from "react-iframe";
import "./PostwithUpvotes.css";

export default class PostWithupvotes extends Component {
  state = {
    openItBelow: false,
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
        if (this.state.openItBelow) {
          this.props.startThreading(this.props.data.id, "toggleOpenItBelow");
        }
      }
    );
  };

  isTest = (data) => {
    if (data.ttitle) return true;
    return false;
  }

  render() {
    const props = this.props;
    // const openSourceInNewTabButtonName = "Open Source in new tab";
    const postPage = (
      <Grid columns={2}>
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
                  {` • Posted at ${props.getFormattedDate(
                    props.data.createdAt.toDate()
                  )}`}
                </text>
              </Comment.Author>
            </Comment.Content>
          </Comment>
        </Grid.Column>
      </Grid>
    );

    const postList = (
      <Grid columns={2}>
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
          <Comment>
            <Comment.Content>
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
              {/*this.state.isAdmin ? (
                <Link to={`/${props.data.id}/${props.data.title}`}>
                  <Comment.Text style={{ marginBottom: "0.5rem" }}>
                    {props.data.content}
                  </Comment.Text>
                </Link>
              ) : (
                <Comment.Text style={{ marginBottom: "0.5rem" }}>
                  {props.data.content}
                </Comment.Text>
              )*/}
              <Comment.Author>
                <text style={{ fontWeight: "bold" }}>{props.data.user}</text>
                <text style={{ opacity: "0.5" }}>
                  {` • Posted at ${props.getFormattedDate(
                    props.data.createdAt.toDate()
                  )}`}
                </text>
              </Comment.Author>
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
                      <Button> Open Source </Button>
                    </Comment.Text>
                  </div>
                </div>
              ) : null}
              {this.state.openItBelow ? (
                props.data.ttitle ?
                <Modal trigger={this.state.openItBelow}>
                <Modal.Header>Article</Modal.Header>
                <Modal.Content>
                  <div dangerouslySetInnerHTML={{__html: props.data.tcontent.replace(/\\n/g,'<br>')}} />
                </Modal.Content>
                <Modal.Actions>
                  <Button primary>
                    Nothing <Icon name='right chevron' />
                  </Button>
                </Modal.Actions>
                </Modal>
                
                : (
                <Iframe
                  url={props.data.source}
                  width="100%"
                  height="450px"
                  display="initial"
                  position="relative"
                  allowFullScreen
                />)
              ) : null}
            </Comment.Content>
          </Comment>
        </Grid.Column>
      </Grid>
    );

    return props.isPostPage ? postPage : postList;
  }
}
