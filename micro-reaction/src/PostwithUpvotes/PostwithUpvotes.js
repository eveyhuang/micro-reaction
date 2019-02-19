import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Comment,
  Icon,
  Statistic,
  Grid,
  List,
  Header,
  Button
} from "semantic-ui-react";
import Iframe from "react-iframe";
import "./PostwithUpvotes.css";

export default class PostWithupvotes extends Component {
  state = {
    openItBelow: false
  };

  toggleOpenItBelow = () => {
    this.setState({
      openItBelow: !this.state.openItBelow
    });
  };

  render() {
    const props = this.props;
    const openSourceInNewTabButtonName = "Open Source in new tab";
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
                  <a
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
                  </a>
                </div>
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
                style={{ width: "100%" }}
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
              <Link to={`/${props.data.id}/${props.data.title}`}>
                <Comment.Text style={{ marginBottom: "0.5rem" }}>
                  {props.data.content}
                </Comment.Text>
              </Link>
              {props.data.source ? (
                <div className="post_source_box">
                  <a
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
                  </a>
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
              <Comment.Author>
                <text style={{ fontWeight: "bold" }}>{props.data.user}</text>
                <text style={{ opacity: "0.5" }}>
                  {` • Posted at ${props.getFormattedDate(
                    props.data.createdAt.toDate()
                  )}`}
                </text>
              </Comment.Author>
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
            </Comment.Content>
          </Comment>
        </Grid.Column>
      </Grid>
    );

    return props.isPostPage ? postPage : postList;
  }
}
