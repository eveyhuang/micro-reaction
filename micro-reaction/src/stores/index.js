import CounterStore from './counter';
import UsersStore from './users';
import PostsStore from './posts';
import TasksStore from './tasks';
// import UserInfoStore from './userinfo';

class RootStore {
  constructor() {
    this.counter = new CounterStore(this);
    this.users = new UsersStore(this);
    this.posts = new PostsStore(this);
    this.tasks = new TasksStore(this);
    // this.userinfo = new UserInfoStore(this);
  }
}

export default RootStore;