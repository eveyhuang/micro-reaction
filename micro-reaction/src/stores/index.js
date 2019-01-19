import CounterStore from './counter';
// import UserInfoStore from './userinfo';

class RootStore {
  constructor() {
    this.counter = new CounterStore(this);
    // this.userinfo = new UserInfoStore(this);
  }
}

export default RootStore;