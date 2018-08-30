import React, { Component } from 'react';
import Post from './Post/Post';
import firebase from 'firebase';
import Article from './Article/Article';
import './App.css';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
var _ = require('lodash');

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

 const config= {
  apiKey: "AIzaSyA2uYoAHxkdcIO-51GYuJxf6YXeBWcu_Ho",
  authDomain: "micro-reaction.firebaseapp.com",
  databaseURL: "https://micro-reaction.firebaseio.com",
  projectId: "micro-reaction",
  storageBucket: "micro-reaction.appspot.com",
  messagingSenderId: "868707662659"
}

class App extends Component {
  
  state ={
      posts:[
        {
          id: 1,
          author:'cg', 
        avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg' ,
        date:'Oct.27, 2017', 
        text: "I honestly don't know how my Republican friends can still call themselves Republicans. In  supporting this president the true essence of the Republican voter is revealed and it is not pretty.  $175,000,000.oo to renovate the White House...fine. Voting against class action suits against banks that have broken the law...fine.  Going back on our word and agreements with our allies....fine. Throwing out the children of immigrants even if born here...fine.  Doing away with special education...fine.  Tormenting young widow of fallen soldier...fine. Doing away with clean air and water...fine. Cutting a trillion dollars out of medicaid and medicare...fine..and on and on.  The things that they are ok with define them...why would anyone with a social concious want anything to do with them? ",
        metric: _.cloneDeep(metrics)},
        {
          id: 2,
          author:'cg', 
        avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg' ,
        date:'Oct.27, 2017', 
        text: "I honestly don't know how my Republican friends can still call themselves Republicans. In  supporting this president the true essence of the Republican voter is revealed and it is not pretty.  $175,000,000.oo to renovate the White House...fine. Voting against class action suits against banks that have broken the law...fine.  Going back on our word and agreements with our allies....fine. Throwing out the children of immigrants even if born here...fine.  Doing away with special education...fine.  Tormenting young widow of fallen soldier...fine. Doing away with clean air and water...fine. Cutting a trillion dollars out of medicaid and medicare...fine..and on and on.  The things that they are ok with define them...why would anyone with a social concious want anything to do with them? ",
        metric: _.cloneDeep(metrics)},
      ],
      comments: []
  }
  
  incCount(id, metricName){
    console.log(id, metricName)

    this.setState((prevState) => {
      return {
        comments : prevState.comments.map(post => {
          if(post.commentID !== id){
            return post
          }else{
            return {
              ...post,
              metric: post.metric.map(metric => {
                if(metric.name !== metricName){
                  return metric;
                }else{
                  return {
                    ...metric,
                    count: metric.count+1
                  }
                }
              })
            }
          }
        })
      }
    })
    
  }

  componentWillMount(){
    
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    
  }

  componentDidMount(){
    
    firebase.database().ref('/comments').on('value',snapshot => {
      console.log(snapshot.val())
      this.setState({
        comments: snapshot.val()
      });
    })
  }


  render() {
    
    return (
      <div className="App">

        <Grid stackable container columns={2} divided>
          <Grid.Column>
          <Segment> <Article/>></Segment>
        </Grid.Column>
        <Grid.Column>
            <Header as='h3' dividing>
                        Comments
            </Header>
          {this.state.comments.map(post => (
              <Segment><Post data={post} handleInc={(id, metricName)=>this.incCount(id, metricName)}/></Segment>
          ))}
      </Grid.Column>
        
        </Grid>
        
      </div>
    );
  }
}

export default App;
