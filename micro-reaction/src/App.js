import React, { Component } from "react";
import Post from "./Post/Post";
import PostwithReply from "./PostwithReply/PostwithReply";
import firebase from "firebase";
import Article from "./Article/Article";
import "./App.css";
import { Grid, Segment, Header } from "semantic-ui-react";
import { cloneDeep } from "lodash";
import update from "immutability-helper";
import PostwithUpvotes from "./PostwithUpvotes/PostwithUpvotes";
import Modal from "./Modal/Modal";
import Counter from "./Counter";
import LoginBox from "./Login/LoginBox";
import RegisterBox from "./Login/RegisterBox";
import Loading from "./Login/loading";
import DataLoading from "./DataLoading";
import fb from "./utils/firebaseWrapper";
import { observer, inject } from "mobx-react";

var _ = require("lodash");

const config = {
  apiKey: "AIzaSyA2uYoAHxkdcIO-51GYuJxf6YXeBWcu_Ho",
  authDomain: "micro-reaction.firebaseapp.com",
  databaseURL: "https://micro-reaction.firebaseio.com",
  projectId: "micro-reaction",
  storageBucket: "micro-reaction.appspot.com",
  messagingSenderId: "868707662659"
};

@inject("posts")
@inject("users")
@observer
class App extends Component {
  state = {
    user: fb.getUser(),
    isTrying: true,
    isLoggedIn: false,
    isLoginOpen: true,
    isRegisterOpen: false,
    isCommentsLoaded: false,
    showTask: false,
    showComId: 0,
    comments: [],
    // comments: [
    //   {
    //     id: 0,
    //     user: "u/LaysClassic1oz",
    //     title: "First Hand Account Of The Day After Hurrican Sandy",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     upvotes: 20,
    //     categories: []
    //   },
    //   {
    //     id: 1,
    //     user: "u/rauce12",
    //     title: "7 places to get help with Sandy loans in New Jersey",
    //     content:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     upvotes: 16,
    //     categories: []
    //   },
    //   {
    //     id: 2,
    //     user: "u/goodnik",
    //     title: "Leave No Pet Behind! Pet Evacuation Laws in NYC",
    //     content:
    //       " Be sure to keep your pet's necessities ready in a to-go bag should you need to evacuate on short notice. Best to include: (at least) a couple days of food veterinary (vaccination) records (put in Ziploc bag to ensure they stay dry) any vital medications (7 days worth is ideal) ID tags. For cat owners: You may want to limit your pet's access to hideaways so that you can easily grab them and load them into a carrier in the event of an evacuation.",
    //     upvotes: 8,
    //     categories: []
    //   },
    //   {
    //     id: 3,
    //     user: "u/deleted",
    //     title: "A safety note when dealing with flooded streets...",
    //     content:
    //       "From a New Orleanian who is used to flooding in urban areas: STAY THE FUCK OFF THE FLOODED STREETS!!!! Why? Because manhole covers get unseated and leave open holes that if you fall in, you won't be coming out of. Think about it as the strongest riptide possible. You can't swim out of it. You can't escape once you're in. You'll die a painful death drowning and scared. Unless you can be 100% sure of where you're walking, don't risk it. Every time it floods in New Orleans, there's always a death or two (at least) that happens this way and it's entirely avoidable. Take care of yourselves and be safe. Just because the rain has stopped doesn't mean that flood waters are safe to wade in.",
    //     upvotes: 6,
    //     categories: []
    //   },
    //   {
    //     id: 4,
    //     user: "u/tomswartz07",
    //     title: "Tip: Charge your computers and devices now",
    //     content:
    //       "Tip: Charge your computers and devices now. Even if internet is down, you can use USB ports to charge your phones if the power goes out!",
    //     upvotes: 5,
    //     categories: []
    //   }
    // ],
    selectedCom: [],
    categOptions: [
      { key: "A", text: "A", value: "a" },
      { key: "B", text: "B", value: "b" },
      { key: "C", text: "C", value: "c" }
    ],
    postSeen: []
  };

  componentWillMount() {
    this.autoLogin();
    fb.getAllPosts().then(data => {
      this.setState({ comments: data, isCommentsLoaded: true });
    });
  }

  componentDidMount() {
    this.getUser();
  }

  autoLogin = async function() {
    const user = await fb.getUserInfo();
    if (user) {
      this.setState({ user, isLoggedIn: true, isTrying: false }, function() {
        // console.log("user", user, this.state.user);
        // console.log("AUTO LOGGED IN!!!");
        const userStore = this.props.users;
        userStore.initUserInfo(
          this.state.user.userId,
          this.state.user.createdAt,
          this.state.user.email,
          this.state.user.name
        );
      });
    } else {
      this.setState({ isTrying: false });
    }
  };

  getUser = async function() {
    const user = this.state.user || (await fb.getUserInfo());
    if (!user) {
      return null;
    }
    this.setState({ user });
  };

  categorize = (comid, categ) => {
    this.setState(prevState => {
      return {
        comments: prevState.comments.map(post => {
          if (post.id !== comid) {
            return post;
          } else {
            console.log(comid, categ);
            return {
              ...post,
              categories: categ
            };
          }
        })
      };
    });
  };

  incCount(id) {
    this.selectComment(id);
    this.showModal(id);
    this.setState(prevState => {
      return {
        comments: prevState.comments.map(post => {
          if (post.id !== id) {
            return post;
          } else {
            return {
              ...post,
              upvotes: post.upvotes + 1
            };
          }
        })
      };
    });
  }

  selectComment(id) {
    this.state.comments.map(com => {
      if (com.id == id) {
        this.setState({ selectedCom: com });
      }
    });
  }

  handleContinue = () => {
    var nextPostID = this.selectOtherPost(this.state.showComId);
    console.log("ID of the next Post to Show: ", nextPostID);
    this.selectComment(nextPostID);
    this.setState(prevState => ({
      showComId: nextPostID,
      postSeen: [...prevState.postSeen, nextPostID]
    }));
  };

  selectOtherPost(curID) {
    var nextID;
    let postSeen = this.state.postSeen;
    this.state.comments.map(post => {
      if (post.id !== curID && !postSeen.includes(post.id)) {
        nextID = post.id;
      }
    });
    return nextID;
  }

  // componentWillMount() {
  //   /*  if (!firebase.apps.length) {
  //     firebase.initializeApp(config);
  //   } */
  // }

  // componentDidMount() {
  //   /* firebase.database().ref('/comments').on('value',snapshot => {
  //     this.setState({
  //       comments: snapshot.val()
  //     });
  //   }) */
  // }

  showModal = id => {
    this.setState({
      showTask: true,
      showComId: id
    });
  };

  hideModal = () => {
    this.setState({ showTask: false });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  handleLogOut = () => {
    if (fb.logout()) {
      this.setState({ isLoggedIn: false });
      return;
    }
    console.log("failed to logout");
  };

  loginTryingTrue = () => {
    this.setState({ isTrying: true });
  };

  loginTryingFalse = () => {
    this.setState({ isTrying: false });
  };

  render() {
    const mainPostsComponent = (
      <div>
        <div className="header_container">
          <div className="left" />
          <Header as="h3" dividing>
            Posts
          </Header>
          <div className="right">
            <button onClick={this.handleLogOut}>Log out</button>
          </div>
        </div>
        {/* <Modal show={this.state.showTask} handleSubmit={this.categorize} handleClose={this.hideModal} post={this.state.selectedCom} categ={this.state.categories}></Modal> */}

        {this.state.isCommentsLoaded ? (
          this.state.comments.map(post => {
            return (
              <Segment vertical>
                <Modal
                  show={this.state.showTask}
                  handleSubmit={this.categorize}
                  handleClose={this.hideModal}
                  handleContinue={this.handleContinue}
                  post={this.state.selectedCom}
                  categ={this.state.categOptions}
                />
                <PostwithUpvotes
                  data={post}
                  handleInc={id => this.incCount(id)}
                />
              </Segment>
            );
          })
        ) : (
          <DataLoading />
        )}
      </div>
    );

    const loginPage = (
      <div className="root-container">
        <div>
          <div className="box-controller">
            <div />
            <div
              className={
                "controller " +
                (this.state.isLoginOpen ? "selected-controller" : "")
              }
              onClick={this.showLoginBox.bind(this)}
            >
              Login
            </div>
            <div
              className={
                "controller " +
                (this.state.isRegisterOpen ? "selected-controller" : "")
              }
              onClick={this.showRegisterBox.bind(this)}
            >
              Register
            </div>
          </div>
          <div className="box-container">
            {this.state.isLoginOpen && (
              <LoginBox
                handleLogin={this.handleLogin}
                loginTryingTrue={this.loginTryingTrue}
                loginTryingFalse={this.loginTryingFalse}
              />
            )}
            {this.state.isRegisterOpen && (
              <RegisterBox
                handleLogin={this.handleLogin}
                loginTryingTrue={this.loginTryingTrue}
                loginTryingFalse={this.loginTryingFalse}
              />
            )}
          </div>
        </div>
      </div>
    );

    const mainPage = this.state.isLoggedIn ? mainPostsComponent : loginPage;

    return (
      <div className="App-container">
        <div className="App">
          {/*<Counter />*/}
          {this.state.isTrying ? <Loading /> : mainPage}
        </div>
      </div>
    );
  }
}

export default App;
