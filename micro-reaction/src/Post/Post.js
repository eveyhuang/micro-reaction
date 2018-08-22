import React from 'react';
import { Button, Comment, Form, Header, Icon, Popup, Grid, Container, Dropdown, Label, Statistic} from 'semantic-ui-react'


const metrics = [
    {
        name: 'Fairness',
        description: 'Reflects values about balanced representation of issues.',
        color: 'red',
        count: 0,
    },
    {
        name: 'Novelty',
        description: 'Offers unique or novel insights, ideas, opinions or stories.',
        color: 'blue',
        count: 0,
    },
    {
        name: 'Personal Experience',
        description:'Contains the writers personal observations or historical perspectives.',
        color: 'yellow',
        count: 0,
    },
    {
        name: 'Argument Quality',
        description: 'Expresses a well-grounded and justifiable argument that warrants claims with evidence.',
        color: 'green',
        count: 0,
    },
    {
        name: 'Readability',
        description: 'Well articulated and written in terms of style, clarity, and adherence to standard grammar. ',
        color: 'purple',
        count: 0,
    }
]

const Post = (props) => {
    
    changeCount =(metricName)=> {
        
    };
    
    return (
        <Container>
            
            <Comment.Group threaded>
                
            <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>

                    <Comment.Author>Tom Lukic</Comment.Author>
                    <Comment.Metadata>
                    <span>Today at 5:42PM</span>
                    </Comment.Metadata>
                    <Comment.Text>
                    I honestly don't know how my Republican friends can still call themselves Republicans. In  supporting this president the true essence of the Republican voter is revealed and it is not pretty.  $175,000,000.oo to renovate the White House...fine. Voting against class action suits against banks that have broken the law...fine.  Going back on our word and agreements with our allies....fine. Throwing out the children of immigrants even if born here...fine.  Doing away with special education...fine.  Tormenting young widow of fallen soldier...fine.
Doing away with clean air and water...fine. Cutting a trillion dollars out of medicaid and medicare...fine..and on and on.  The things that they are ok with define them...why would anyone with a social concious want anything to do with them?
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action> 
                            {metrics.map(metric => (
                                <Statistic color={metric.color} size='mini'>
                                
                                    <Statistic.Value>
                                        <Popup 
                                            key={metric.name}
                                            trigger={<Label circular color={metric.color} size='mini'/>}
                                            header={metric.name}
                                            content={metric.description}
                                            size = 'tiny'
                                            click = {() => props.incCount(metric.name)}
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