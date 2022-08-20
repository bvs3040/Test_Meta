export class State {
    constructor() {
      this.currentUser = null,
      this.currentIndex = null;
    };
    set currentUser(user) {
      this._currentUser = user;
    };
    set currentIndex(index) {
      this._currentIndex = index;
    };
    get currentUser() {
      return this._currentUser;
    };
    get currentIndex() {
      return this._currentIndex;
    };
};

  