import React, { Component } from "react";
import Post from "./Post/Post";
import PostwithReply from "./PostwithReply/PostwithReply";
import firebase from "firebase";
import Article from "./Article/Article";
import "./App.css";
import { Grid, Segment, Header, Rail, Sticky } from "semantic-ui-react";
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
import HeaderComp from "./Header";
import HeaderNav from "./HeaderNav";
import Thread from "./Thread";
import classNames from "classnames";
import { ScrollElement, ScrollView } from "./Scroller";

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
    tab: "home",
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
    //     id: postInfo.pId,
    //     postId: postId,
    //     user: postInfo.user,
    //     title: postInfo.title,
    //     content: postInfo.content,
    //     upvotes: postInfo.upvotes,
    //     createdAt: postInfo.createdAt,
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

  handleSelectTab = tab => {
    this.setState({ tab });
  };

  componentWillMount() {
    this.autoLogin();
    fb.getAllPosts().then(data => {
      this.setState({ comments: data, isCommentsLoaded: true });
    });
  }

  componentDidMount() {
    this.getUser();
    fb.isAdmin().then(data => {
      this.setState({ isAdmin: data });
    });
  }

  updatePostsList = async () => {
    this.setState({ isCommentsLoaded: false }, async function() {
      await fb.getAllPosts().then(data => {
        this.setState({ comments: data, isCommentsLoaded: true });
      });
    });
  };

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
    this.setState(
      prevState => {
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
      },
      async function() {
        // await fb.voteOnThisPost(id, true);
        // await fb.newTaskThread(id, "upvote");
      }
    );
  }

  decCount(id) {
    this.selectComment(id);
    this.showModal(id);
    this.setState(
      prevState => {
        return {
          comments: prevState.comments.map(post => {
            if (post.id !== id) {
              return post;
            } else {
              return {
                ...post,
                upvotes: post.upvotes - 1
              };
            }
          })
        };
      },
      async function() {
        // await fb.voteOnThisPost(id, false);
        // await fb.newTaskThread(id, "downvote");
      }
    );
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

  hideTask = () => {
    this.setState({
      showTask: false,
      selectedCom: [],
      showComId: 0,
      postSeen: []
    });
  };

  handleLogin = () => {
    this.getUser();
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

  returnMiddle = middleText => {
    let middle;
    if (middleText == "home") {
      middle = "Home";
    } else if (middleText == "notification") {
      middle = "Notification";
    } else {
      middle = "Message";
    }
    return middle;
  };

  scrollTo = name => {
    this._scroller.scrollTo(name);
  };

  render() {
    const postList = (
      <div>
        <ScrollView ref={scroller => (this._scroller = scroller)}>
          <div>
            {this.state.comments.map(post => {
              return (
                <ScrollElement key={post.id} name={post.id}>
                  <div
                    className={classNames({
                      post_selected: post.id == this.state.selectedCom.id
                    })}
                  >
                    <Segment vertical>
                      {/*<Modal
                show={this.state.showTask}
                handleSubmit={this.categorize}
                handleClose={this.hideTask}
                handleContinue={this.handleContinue}
                post={this.state.selectedCom}
                categ={this.state.categOptions}
              />*/}
                      <PostwithUpvotes
                        data={post}
                        handleInc={id => this.incCount(id)}
                        handleDec={id => this.decCount(id)}
                      />
                    </Segment>
                  </div>
                </ScrollElement>
              );
            })}
          </div>
        </ScrollView>
      </div>
    );

    const mainComponent = (
      <div
        className="mainComponent_wrapper"
        style={
          this.state.isCommentsLoaded ? null : { width: "100%", height: "100%" }
        }
      >
        <div className="main_container">
          <div className="post_container">
            {this.state.isCommentsLoaded ? (
              <div className="post_list">{postList}</div>
            ) : (
              <div className="post_list">
                <DataLoading />
              </div>
            )}
          </div>
          {
            <div className="sticky_thread">
              <Thread
                scrollTo={this.scrollTo}
                userName={this.state.user.name}
                userEmail={this.state.user.email}
                showTask={this.state.showTask}
                handleSubmit={this.categorize}
                handleClose={this.hideTask}
                handleContinue={this.handleContinue}
                post={this.state.selectedCom}
                categ={this.state.categOptions}
              />
            </div>
          }
        </div>
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

    const mainPage = this.state.isLoggedIn ? mainComponent : loginPage;

    return (
      <div className="App-container">
        {this.state.isTrying || !this.state.isLoggedIn ? (
          <HeaderComp middle={"Welcome to Kemi"} />
        ) : (
          <HeaderComp
            middle={this.returnMiddle(this.state.tab)}
            left={
              <HeaderNav tab={this.state.tab} onSelect={this.handleSelectTab} />
            }
            right={
              <div className="logout" onClick={this.handleLogOut}>
                {"Log out"}
              </div>
            }
          />
        )}
        <div className="App">
          {/*<Counter />*/}
          {this.state.isTrying ? <Loading /> : mainPage}
        </div>
      </div>
    );
  }
}

export default App;
