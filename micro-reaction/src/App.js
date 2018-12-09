import React, { Component } from 'react';
import Post from './Post/Post';
import PostwithReply from './PostwithReply/PostwithReply';
import firebase from 'firebase';
import Article from './Article/Article';
import './App.css';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
import update from 'immutability-helper';
import PostwithUpvotes from './PostwithUpvotes/PostwithUpvotes';
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
      showTask : false,
      comments : [
        {
          "id":0,
          "user": "Evey",
          "content": "hello",
          "upvotes": 5,
          "downvotes":0,
          "categories": []
        },
        {
          "id":1,
          "user": "Yoonseo",
          "content": "Hello Hello Hello",
          "upvotes": 2,
          "downvotes":0,
          "categories": []
        }
      ]
  }
  
  
/*   

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
  } */

  incCount(id){
    this.showModal()
    this.setState((prevState) => {
      return {
        comments : prevState.comments.map(post => {
           if(post.id !== id){
             return post
           }else{
             return {
               ...post,
               upvotes: post.upvotes+1
             }
           }
         }) 
        }
      })
  }
  componentWillMount(){
    
   /*  if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } */

    
  }

  componentDidMount(){
    
    /* firebase.database().ref('/comments').on('value',snapshot => {
      this.setState({
        comments: snapshot.val()
      });
    }) */
  }

  showModal=()=>{
    this.setState(
      {showTask:true}
    );
  }

  render() {
   
  
    return (
      <div className="App">

        
  
       
            <Header as='h3' dividing>
                        Comments
            </Header>
          {this.state.comments.map(post => {
              
             /*  if (post.inReplyTo !== 0){
                
              } else {
                if (Object.keys(post.response).length==1){
                  return <Segment vertical ><Post data={post} handleInc={(id, metricName)=>this.incCount(id, metricName)}/></Segment> 
                } else {
                  var responses=[]
                  post.response.map(id=>{
                    if (id == -1){ 
                    }else {
                      responses.push(this.state.comments[id])
                    }
                  })
                  return <Segment vertical><PostwithReply data={post} responses={responses} handleInc={(id, metricName)=>this.incCount(id, metricName)}/></Segment> 
                }
              }  */
              return <Segment vertical ><PostwithUpvotes data={post} handleInc={(id)=>this.incCount(id)}/></Segment>
          })}
    

        
      </div>
    );
  }
}

export default App;
