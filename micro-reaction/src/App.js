import React, { Component } from 'react';
import logo from './logo.svg';
import Post from './Post/Post';
import './App.css';
import { Button, Comment, Form, Header, Label, List } from 'semantic-ui-react'

class App extends Component {
  
  render() {
    return (
      <div className="App">

      
        <Header as='h3' dividing>
                    Comments
        </Header>
      {/*   <List horizontal>
          <List.Item>
            <Label circular color='red' />
            <List.Content>
              <List.Header>Fairness</List.Header>
              Top Contributor
            </List.Content>
          </List.Item>
          <List.Item>
          <Label circular color='yellow' />
            <List.Content>
              <List.Header>Novelty</List.Header>
              Admin
            </List.Content>
          </List.Item>
          <List.Item>
            <Label circular color='green' />
            <List.Content>
              <List.Header>Readability</List.Header>
              Top Rated User
            </List.Content>
          </List.Item>
        </List>
 */}
        <Post/>
      </div>
    );
  }
}

export default App;
