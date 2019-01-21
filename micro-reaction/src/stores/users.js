import { observable, action } from "mobx";

export default class UsersStore {
  @observable currentUser = {
    userId: "",
    createdAt: "",
    email: "",
    name: ""
  };

  constructor(root) {
    this.root = root;
  }

  @action
  initUserInfo = (userId, createdAt, email, name) => {
    this.currentUser = {
      userId: userId,
      createdAt: createdAt,
      email: email,
      name: name
    };
    console.log("userStore is updated!")
  };

  @action
  getUserId = () => {
      return this.currentUser.userId
  };
}
