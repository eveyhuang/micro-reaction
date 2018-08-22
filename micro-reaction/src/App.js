import React, { Component } from 'react';
import logo from './logo.svg';
import Post from './Post/Post';
import './App.css';
import { Button, Comment, Form, Header, Label, List } from 'semantic-ui-react'

const metrics= [
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
  }]

class App extends Component {
  
  state ={
      posts:[
        {author:'cg', 
        avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg' ,
        date:'Oct.27, 2017', 
        text: "I honestly don't know how my Republican friends can still call themselves Republicans. In  supporting this president the true essence of the Republican voter is revealed and it is not pretty.  $175,000,000.oo to renovate the White House...fine. Voting against class action suits against banks that have broken the law...fine.  Going back on our word and agreements with our allies....fine. Throwing out the children of immigrants even if born here...fine.  Doing away with special education...fine.  Tormenting young widow of fallen soldier...fine. Doing away with clean air and water...fine. Cutting a trillion dollars out of medicaid and medicare...fine..and on and on.  The things that they are ok with define them...why would anyone with a social concious want anything to do with them? ",
        metrics: metrics},
      ],
  }

  incCount(metricName){
    return null
  }

  render() {
    return (
      <div className="App">

      
        <Header as='h3' dividing>
                    Comments
        </Header>

      {this.state.posts.map(post => (
        <Post data={post} incCount={this.incCount}/>
      ))}
        
      </div>
    );
  }
}

export default App;
