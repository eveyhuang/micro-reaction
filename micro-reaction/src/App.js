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
import Modal from './Modal/Modal';

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
      showComId: 0,
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
      ],
      selectedCom:[],
      categories: [
        {key: 'A', text: 'A', value: 'a'},
        {key: 'B', text: 'B', value: 'b'},
        {key: 'C', text: 'C', value: 'c'},
      ],
  }
  

  incCount(id){
    this.selectComment(id)
    this.showModal(id)
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

  selectComment(id){
    this.state.comments.map(com => {
      if (com.id == id) {
        this.setState({selectedCom:com})
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

  showModal = (id) =>{
    this.setState({ 
      showTask : true,
      showComId : id
    });
  }

  hideModal = () => {
    this.setState({ showTask : false });
  };

  render() {


    return (
      <div className="App">
            <Header as='h3' dividing>
                        Comments
            </Header>
            <Modal show={this.state.showTask} handleClose={this.hideModal} post={this.state.selectedCom} categ={this.state.categories}></Modal>
            
          {this.state.comments.map(post => {
              return <Segment vertical ><PostwithUpvotes data={post} handleInc={(id)=>this.incCount(id)}/></Segment>
          })}
    

        
      </div>
    );
  }
}

export default App;
