import React from "react";
import {
  Comment,
  Icon,
  Statistic,
  Grid,
  List,
  Header
} from "semantic-ui-react";

import enLocale from "date-fns/locale/en";
import differenceInDays from "date-fns/difference_in_days";
import distanceInWords from "date-fns/distance_in_words";
import format from "date-fns/format";

function getFormattedDate(d) {
  const now = new Date();
  const date = new Date(d);

  // Less then 1 min
  if (now - date < 60 * 1000) return "Just now";
  // Less then 10 days
  if (differenceInDays(now, date) < 10) {
    return distanceInWords(now, date, { locale: enLocale, addSuffix: true });
  }
  // otherwise YYYY-MM-DD
  return format(date, "YYYY-MM-DD");
}

const PostwithUpvotes = props => {
  return (
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
            <Header as="h3" dividing>
              {props.data.title}
            </Header>
            <Comment.Text style={{ marginBottom: "0.5rem" }}>
              {props.data.content}
            </Comment.Text>
            <Comment.Author>
              <text style={{ fontWeight: "bold" }}>{props.data.user}</text>
              <text style={{ opacity: "0.5" }}>
                {` • Posted at ${getFormattedDate(
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
};

export default PostwithUpvotes;
