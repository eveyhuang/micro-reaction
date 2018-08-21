import React, { Component } from 'react';
import logo from './logo.svg';
import Post from './Post/Post';
import './App.css';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header as='h3' dividing>
                    Comments
                </Header>
        <Post/>
      </div>
    );
  }
}

export default App;
