import { observable, action } from "mobx";

export default class PostsStore {
  @observable state = {};

  constructor(root) {
    this.root = root;
  }

  @action
  giveNextPost = () => {};

  @action
  getFilteredList = allPosts => {
    console.log("getFilteredList!");
    //filtering(recommending) algorithm here!
    return allPosts;
  };
}
