import React from 'react';
import { Comment, Icon, Statistic, Grid, List } from 'semantic-ui-react'

const PostwithUpvotes = (props) => {

    return (
        <Grid columns={2}>
            
                <Grid.Column width={1}>
                    <List relaxed>
                        <List.Item>
                        <Icon name='angle up' size='large' onClick = {() => props.handleInc(props.data.id)} />
                        </List.Item>
                        <List.Item>
                            <Statistic size='mini'>
                                <Statistic.Value>{props.data.upvotes}</Statistic.Value>
                            </Statistic>
                        </List.Item>
                        <List.Item>
                            <Icon name='angle down' size='large' />
                        </List.Item>
                    </List>
                    
                </Grid.Column>
                <Grid.Column width={14}>
                    <Comment>
                        <Comment.Content>
                            <Comment.Author>{props.data.user}</Comment.Author>
                            <Comment.Text>
                            {props.data.content}
                            </Comment.Text>
                            
                        </Comment.Content>
                    </Comment>
                </Grid.Column>
        
        </Grid>
  
    );
};

export default PostwithUpvotes;