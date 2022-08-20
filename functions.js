import { authForm } from "./main.js";
import { regForm } from "./main.js";
import { editingFormsBlock } from "./main.js";
import { User } from "./user.js";
import { appState } from "./main.js";
import { editingEmail } from "./main.js";
import { editingLogin } from "./main.js";
import { editingPhone } from "./main.js";
import { editingPassword } from "./main.js";
import { editingRepPassword } from "./main.js";

export const authUser = function (login, password) {
    const user = new User(login, password);
    if (!user.hasAccess) return false;
    return true;
  };
  
export const openAuthorization = function () {
    if (regForm.classList.contains('invisible')) {
        editingFormsBlock.classList.add('invisible');
    } else {
        regForm.classList.add('invisible'); 
    }
    authForm.classList.remove('invisible');
};

export const openRegistration = function() {
    if (authForm.classList.contains('invisible')) {
        editingFormsBlock.classList.add('invisible');
    } else {
        authForm.classList.add('invisible'); 
    }
    regForm.classList.remove('invisible');
};

export const openEditing = function () {
    let usersArr = getFromStorage(appState.currentUser.storageKey);
    usersArr.forEach((element, i) => {
        if (element.login == appState.currentUser.login) {
            appState.currentIndex = i;
        };
    });
    
    editingLogin.value = appState.currentUser.login;
    editingPhone.value = appState.currentUser.phone;
    editingEmail.value = appState.currentUser.email;
    editingPassword.value = appState.currentUser.password;

    if (authForm.classList.contains('invisible')) {
        regForm.classList.add('invisible');
    } else {
        authForm.classList.add('invisible'); 
    }
    editingFormsBlock.classList.remove('invisible');
};

export const getFromStorage = function (key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
};
  
export const addToStorage = function (obj, key) {
    const storageData = getFromStorage(key);
    storageData.push(obj);
    localStorage.setItem(key, JSON.stringify(storageData));
};

export const createTestUser = function () {
    localStorage.clear();
    const testUser = new User("7", "7");
    User.save(testUser);
};

export const createUser = function (login, password, email, phone) {
    const newUser = new User(login, password, email, phone);
    User.save(newUser);
    appState.currentUser = newUser;
};

export const editingUser = function () {
    const index = appState.currentIndex;
    const key = appState.currentUser.storageKey;
    const usersArr = getFromStorage(key);
    usersArr[index] = appState.currentUser;
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(usersArr));   
};