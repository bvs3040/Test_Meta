
import { getFromStorage, addToStorage } from "./functions.js";
import { appState } from "./main.js";

export class User{
  constructor(login, password, email, phone) {
    this.login = login;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.storageKey = "users";  
  };
  get hasAccess() {
    let users = getFromStorage(this.storageKey);
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login == this.login && user.password == this.password) {
        appState.currentUser = user;
        return true;
      };
    };
    return false;
  };
  static save(user) {
    addToStorage(user, user.storageKey);  
  }
};