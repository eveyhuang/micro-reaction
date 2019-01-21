import { observable, action } from "mobx";

export default class TasksStore {
  @observable state = {};

  constructor(root) {
    this.root = root;
  }

  @action
  giveNextTask = () => {};

  @action
  chooseNextTask = () => {};
}
