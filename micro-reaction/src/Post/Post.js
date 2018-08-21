import React from 'react';
import { Button, Comment, Form, Header, Icon, Popup, Grid, Container } from 'semantic-ui-react'

const Post = (props) => {
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
                            <Popup trigger={<Button icon= "thumbs up" content='Like' size = 'mini'/>} on='click'>
                                <Grid devided columns='equal'  >
                                <Grid.Row>
                                    <Popup
                                    trigger={<Button color='blue' content='Fairness'  />}
                                    content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                                    position='bottom left'
                                    size='mini'
                                    inverted
                                    />
                                </Grid.Row>
                                <Grid.Row>
                                    <Popup
                                    trigger={<Button color='red' content='Novelty'  />}
                                    content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
                                    position='bottom left'
                                    size='mini'
                                    inverted
                                    />
                                </Grid.Row>
                                <Grid.Row>
                                    <Popup
                                    trigger={<Button color='yellow' content='Personal Experience'  />}
                                    content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                                    position='bottom left'
                                    size='mini'
                                    inverted
                                    />
                                </Grid.Row>
                                <Grid.Row>
                                    <Popup
                                    trigger={<Button color='green' content='Readability' />}
                                    content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                                    position='bottom left'
                                    size='mini'
                                    inverted
                                    />
                                </Grid.Row>
                                <Grid.Row>
                                    <Popup
                                    trigger={<Button color='purple' content='Argument Quality' />}
                                    content='Expresses a well-grounded and justifiable argument that warrants claims with evidence.'
                                    position='bottom left'
                                    size='mini'
                                    inverted
                                    />
                                </Grid.Row>
                                </Grid>
                            </Popup>
                        
                        </Comment.Action>
                        <Comment.Action><Button icon= "reply" content='Reply' size = 'mini'/></Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        </Comment.Group>
      </Container>
    );
};




export default Post;