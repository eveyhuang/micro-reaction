import React, { Component } from 'react';
import Post from './Post/Post';
import firebase from 'firebase';
import Article from './Article/Article';
import './App.css';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
import update from 'immutability-helper';
var _ = require('lodash');

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
      comments: []
  }
  
  incCount2(id, metricName){

    this.setState((prevState) => {
      console.log(prevState.comments[id])
      return {
        comments: {
          ...prevState.comments,
          [id]:{
            ...prevState.comments[id],
            metric: prevState.comments[id].metric.map(metric => {
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
      }
    },
    function() { console.log("setState completed", this.state.comments) })
    
  }
  

  incCount(id, metricName){
    this.setState((prevState) => {
      return {
        comments : prevState.comments.map(post => {
           if(post.id !== id){
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
      this.setState({
        comments: snapshot.val()
      });
    })
  }


  render() {
    //TODO: Deal with reply hiearchy
    // console.log(this.state.comments)
    // console.log(this.state.comments[0])
    // console.log(typeof(this.state.comments[0]))
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
