import React from 'react';
import { Button, Comment, Icon, Popup, Grid, Container, Label, Statistic} from 'semantic-ui-react'


const Post = (props) => {
    return (
        
        <Container>
            
            <Comment.Group threaded>
                
            <Comment>
                <Comment.Avatar as='a' src={props.data.avatar} />
                <Comment.Content>

                    <Comment.Author>{props.data.userDisplayName}</Comment.Author>

                    <Comment.Text> {props.data.commentBody.replace(/<\s*\/?\s*br\s*.*?>/g, " \n ")}</Comment.Text>
                     <Comment.Actions>
                        <Comment.Action > 
                            {props.data.metric.map(met=> (
                                <Statistic color={met.color} size='mini'>
                                    <Statistic.Value>
                                        <Popup  
                                            key={met.name}
                                            trigger={<Label onClick = {() => props.handleInc(props.data.id, met.name)} circular color={met.color} size='mini'/>}
                                            header={met.name}
                                            content={met.description}
                                            size = 'tiny'
                                        />
                                        {met.count}
                                    </Statistic.Value>  <br />
                                </Statistic>
                                
                            ))}
                        
                        </Comment.Action>
                    </Comment.Actions> 
                </Comment.Content>
            </Comment>
        </Comment.Group>
      </Container>
    );
};




export default Post;