import React from 'react';
import { Button, Comment, Icon, Popup, Grid, Container, Label, Statistic} from 'semantic-ui-react'


const Post = (props) => {
    return (
        
        <Container>
            
            <Comment.Group threaded>
                
            <Comment>
                <Comment.Avatar as='a' src={props.data.avatar} />
                <Comment.Content>

                    <Comment.Author>{props.data.author}</Comment.Author>
                    <Comment.Metadata>
                    <span>{props.data.date}</span>
                    </Comment.Metadata>
                    <Comment.Text> {props.data.text}</Comment.Text>
                     <Comment.Actions>
                        <Comment.Action > 
                            {props.data.metrics.map(metric => (
                                <Statistic color={metric.color} size='mini'>
                                    <Statistic.Value>
                                        <Popup  
                                            key={metric.name}
                                            trigger={<Label onClick = {() => props.handleInc(props.data.id, metric.name)} circular color={metric.color} size='mini'/>}
                                            header={metric.name}
                                            content={metric.description}
                                            size = 'tiny'
                                        />
                                        {metric.count}
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