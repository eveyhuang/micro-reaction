import React from "react";
import {
  Comment,
  Icon,
  Statistic,
  Grid,
  List,
  Header,
  Button
} from "semantic-ui-react";
import "./PostwithUpvotes.css";

const PostwithUpvotes = props => {
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
      <p>{props.data.categories}</p>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    props.handleRemovePost(props.data.id);
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </Header>
            <Comment.Text style={{ marginBottom: "0.5rem" }}>
              {props.data.content}
            </Comment.Text>
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
      <p>{props.data.categories}</p>
    </Grid>
  );

  return props.isPostPage ? postPage : postList;
};

export default PostwithUpvotes;
