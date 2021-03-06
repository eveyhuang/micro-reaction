// seems to be outdated and unused.


import React, { Component } from "react";
import firebase from "firebase";
import "./AppComments.css";
import {
  Grid,
  Segment,
  Header,
  Rail,
  Sticky,
  Dropdown
} from "semantic-ui-react";
import { cloneDeep } from "lodash";
import update from "immutability-helper";
import PostwithUpvotes from "./PostwithUpvotes/PostwithUpvotes";
import Modal from "./Modal";
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
import { IoIosArrowRoundBack } from "react-icons/io";

import enLocale from "date-fns/locale/en";
import differenceInDays from "date-fns/difference_in_days";
import distanceInWords from "date-fns/distance_in_words";
import format from "date-fns/format";
import { isThursday } from "date-fns";

var _ = require("lodash");

@inject("posts")
@inject("users")
@observer
class AppComments extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  state = {
    tab: "",
    user: fb.getUserInfo(),
    isTrying: true,
    isLoggedIn: false,
    isLoginOpen: true,
    isRegisterOpen: false,
    isCommentsLoaded: false,
    isThreading: false,
    showTask: false,
    showComId: 0,
    post: {},
    isPostLoaded: false,
    comments: [],
    orderingMode: "Popular",
    orderingOptions: [
      { key: "Popular", text: "Popular", value: "Popular" },
      { key: "Random", text: "Random", value: "Random" }
    ],
    selectedCom: [],
    postSeen: [],
    userThread: [],
    isThreadLoaded: false
  };

  getFormattedDate = d => {
    const now = new Date();
    const date = new Date(d);

    // Less then 1 min
    if (now - date < 60 * 1000) return "Just now";
    // Less then 10 days
    if (differenceInDays(now, date) < 10) {
      return distanceInWords(now, date, { locale: enLocale, addSuffix: true });
    }
    // otherwise YYYY-MM-DD
    return format(date, "YYYY-MM-DD");
  };

  handleSelectTab = tab => {
    this.setState({ tab });
  };

  componentWillMount() {
    document.removeEventListener("keydown", this.escFunction, false);
    this.autoLogin();
    // console.log("this.props.match.params.postId:",this.props.match.params.postId)
    fb.getThisPost(this.props.match.params.postId).then(postInfo => {
      this.setState(
        {
          post: postInfo,
          isPostLoaded: true
        },
        function() {
          //   console.log("AppComments' this.state.post:", this.state.post);
        }
      );
    });
    // fb.getAllPosts().then(data => {
    //   this.setState({
    //     comments: data.filter(value => Object.keys(value).length !== 0),
    //     isCommentsLoaded: true
    //   });
    // });
    this.getAllThreadsOfThisUser();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    this.getUser();
    fb.isAdmin().then(data => {
      this.setState({ isAdmin: data });
    });
    window.scrollTo(0, 0);
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      //Esc key
      this.hideTask();
      this.getAllThreadsOfThisUser();
    }
  };

  getAllThreadsOfThisUser = async () => {
    await fb.getAllThreadsOfThisUser(this.state.userId).then(threads => {
      return this.setState({ userThread: threads, isThreadLoaded: true });
    });
  };

  resetHistoryOfThisUser = () => {
    this.setState({ userThread: [], isThreadLoaded: false });
  };

  updatePostsList = async () => {
    const prevOrderingMode = this.state.orderingMode
      ? this.state.orderingMode
      : "Popular";
    this.setState({ isCommentsLoaded: false }, async function() {
      await fb.getAllPosts().then(data => {
        this.setState({
          comments: data.filter(value => Object.keys(value).length !== 0),
          isCommentsLoaded: true,
          orderingMode: prevOrderingMode
        });
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
    console.log("getUser!!!");
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
            // console.log(comid, categ);
            return {
              ...post,
              categories: categ
            };
          }
        })
      };
    });
  };

  // setOnThreading = () => {
  //   this.setState({ isThreading: true });
  // };

  setOffThreading = () => {
    this.setState({ isThreading: false });
  };

  incCountPost(id) {
    this.setState(
      async function() {
        await fb.voteOnThisPost(id, true);
      }.then(prevState => {
        return {
          post: {
            ...prevState.post,
            upvotes: prevState.post.upvotes + 1
          }
        };
      })
    );
  }

  decCountPost(id) {
    this.setState(
      async function() {
        await fb.voteOnThisPost(id, false);
      }.then(prevState => {
        return {
          post: {
            ...prevState.post,
            upvotes: prevState.post.upvotes - 1
          }
        };
      })
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
    // console.log("ID of the next Post to Show: ", nextPostID);
    this.selectComment(nextPostID);
    this.setState(prevState => ({
      showComId: nextPostID,
      postSeen: [...prevState.postSeen, nextPostID]
    }));
  };

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  selectOtherPost(curID) {
    var nextID;
    let postSeen = this.state.postSeen;

    let posibleId = this.getRandomInt(this.state.comments.length);
    nextID = posibleId;
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
      postSeen: [],
      isThreading: false
    });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true }, function() {
      fb.getUserInfo().then(value => {
        this.setState({ user: value });
      });
    });
  };

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  };

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  };

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

  handleOrderingDrowdown = (event, { value }) => {
    this.setState({ orderingMode: value });
  };

  shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  orderingBasedOnSelectedMode = () => {
    let resultList = [];
    if (this.state.orderingMode == "Popular") {
      resultList = this.state.comments.sort(function(a, b) {
        return b.upvotes - a.upvotes;
      });
      return resultList;
    }
    resultList = this.shuffle(this.state.comments); // else this.state.orderingMode == "Random"
    // console.log("Random!!!:", resultList);
    return resultList;
    // if (this.state.orderingMode == "Random") {
    // resultList = this.shuffle(this.state.comments);
    // console.log("Random!!!:",resultList)
    //   this.setState({ comments: resultList });
    //   return resultList;
    // }
  };

  scrollTo = name => {
    var elOffset = this._scroller.offsetTop;
    var elHeight = this._scroller.clientHeight;
    var windowHeight = window.height;
    var offset;
    if (elHeight < windowHeight) {
      offset = elOffset - (windowHeight / 2 - elHeight / 2);
    } else {
      offset = elOffset;
    }
    // console.log("window:", windowHeight, offset, elHeight, elOffset);
    this._scroller.scrollTo(name, 100);
  };

  handleRemovePost = async id => {
    await fb.removeThisPost(id).then(() => {
      this.updatePostsList();
    });
  };

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const post = (
      <div>
        <div className="post_header">
          <div className="post_header_goback" onClick={this.goBack}>
            <IoIosArrowRoundBack size="1.5rem" />
            <text className="post_header_goback_text">Back to List</text>
          </div>
        </div>
        <PostwithUpvotes
          isPostPage
          data={this.state.post}
          getFormattedDate={this.getFormattedDate}
          handleInc={id => this.incCountPost(id)}
          handleDec={id => this.decCountPost(id)}
        />
      </div>
    );
    const commantList = (
      <div>
        <div className="post_header">
          <div className="post_header_dropdown">
            <Dropdown
              fluid
              selection
              defaultValue={this.state.orderingMode}
              onChange={this.handleOrderingDrowdown}
              options={this.state.orderingOptions}
            />
          </div>
        </div>
        <ScrollView ref={scroller => (this._scroller = scroller)}>
          <div>
            {this.orderingBasedOnSelectedMode(this.state.comments).map(post => {
              return (
                <ScrollElement key={post.id} name={post.id}>
                  <div
                    className={classNames({
                      post_selected: post.id == this.state.selectedCom.id
                    })}
                  >
                    <Segment vertical>
                      <PostwithUpvotes
                        data={post}
                        handleRemovePost={this.handleRemovePost}
                        isThisUserAuthor={post.user == this.state.user.name}
                        getFormattedDate={this.getFormattedDate}
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
          this.state.isPostLoaded ? null : { width: "100%", height: "100%" }
        }
      >
        <div className="main_container">
          <div className="post_container">
            {this.state.isPostLoaded ? (
              <div className="post_list">{post}</div>
            ) : (
              <div className="post_list">
                <DataLoading />
              </div>
            )}
          </div>
          {
            <div className="sticky_thread">
             {/*  <Thread
                isPostPage
                updatePostsList={this.updatePostsList}
                resetHistoryOfThisUser={this.resetHistoryOfThisUser}
                userThread={this.state.userThread}
                isThreadLoaded={this.state.isThreadLoaded}
                getAllThreadsOfThisUser={this.getAllThreadsOfThisUser}
                getFormattedDate={this.getFormattedDate}
                setOffThreading={this.setOffThreading}
                scrollTo={this.scrollTo}
                user={this.state.user}
                showTask={this.state.showTask}
                handleSubmit={this.categorize}
                handleClose={this.hideTask}
                handleContinue={this.handleContinue}
                post={this.state.selectedCom}
                categ={this.state.categOptions}
              /> */}
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
            middle={`Post`}
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

export default AppComments;
