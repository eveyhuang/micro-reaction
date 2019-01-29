import React from "react";
import {
  Button,
  Comment,
  Icon,
  Popup,
  Grid,
  Container,
  Label,
  Statistic
} from "semantic-ui-react";

const PostwithReply = props => {
  return (
    <Container>
      <Comment.Group threaded>
        <Comment>
          {/* <Comment.Avatar as='a' src={props.data.picURL} /> */}
          <Comment.Content>
            <Comment.Author>{props.data.userDisplayName}</Comment.Author>

            <Comment.Text>
              {" "}
              {props.data.commentBody.replace(/<\s*\/?\s*br\s*.*?>/g, " \n ")}
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>
                {props.data.metric.map(met => (
                  <Statistic color={met.color} size="mini">
                    <Statistic.Value>
                      <Popup
                        key={met.name}
                        trigger={
                          <Label
                            onClick={() =>
                              props.handleInc(props.data.id, met.name)
                            }
                            circular
                            color={met.color}
                            size="mini"
                          />
                        }
                        header={met.name}
                        content={met.description}
                        size="tiny"
                      />
                      {met.count}
                    </Statistic.Value>{" "}
                    <br />
                  </Statistic>
                ))}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>

          <Comment.Group>
            {props.responses.map(response => (
              <Comment>
                {/* <Comment.Avatar as='a' src={response.picURL} /> */}
                <Comment.Content>
                  <Comment.Author>{response.userDisplayName}</Comment.Author>

                  <Comment.Text>
                    {" "}
                    {response.commentBody.replace(
                      /<\s*\/?\s*br\s*.*?>/g,
                      " \n "
                    )}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>
                      {response.metric.map(met => (
                        <Statistic color={met.color} size="mini">
                          <Statistic.Value>
                            <Popup
                              key={met.name}
                              trigger={
                                <Label
                                  onClick={() =>
                                    props.handleInc(response.id, met.name)
                                  }
                                  circular
                                  color={met.color}
                                  size="mini"
                                />
                              }
                              header={met.name}
                              content={met.description}
                              size="tiny"
                            />
                            {met.count}
                          </Statistic.Value>{" "}
                          <br />
                        </Statistic>
                      ))}
                    </Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </Comment>
      </Comment.Group>
    </Container>
  );
};

export default PostwithReply;
