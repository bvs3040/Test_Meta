import { authForm } from "./main.js";
import { regForm } from "./main.js";
import { editingFormsBlock } from "./main.js";
import { User } from "./user.js";
import { appState } from "./main.js";
import { editingEmail } from "./main.js";
import { editingLogin } from "./main.js";
import { editingPhone } from "./main.js";
import { storageKey } from "./main.js";

//авторизация юзера
export const authUser = function (login, password) {
    const user = new User(login, password);
    if (!user.hasAccess) return false;
    return true;
};

//откр окно авторизации
export const openAuthorization = function () {
    if (regForm.classList.contains('invisible')) {
        editingFormsBlock.classList.add('invisible');
    } else {
        regForm.classList.add('invisible'); 
    }
    authForm.classList.remove('invisible');
};

//откр окно регистрации
export const openRegistration = function() {
    if (authForm.classList.contains('invisible')) {
        editingFormsBlock.classList.add('invisible');
    } else {
        authForm.classList.add('invisible'); 
    }
    regForm.classList.remove('invisible');
};

//откр окно редактирования контактов
export const openEditing = function () {
    let usersArr = getFromStorage(storageKey);
    usersArr.forEach((element, i) => {
        if (element.login == appState.currentUser.login) {
            appState.currentIndex = i;
        };
    });
    
    editingLogin.value = appState.currentUser.login;
    editingPhone.value = appState.currentUser.phone;
    editingEmail.value = appState.currentUser.email;

    if (authForm.classList.contains('invisible')) {
        regForm.classList.add('invisible');
    } else {
        authForm.classList.add('invisible'); 
    }
    editingFormsBlock.classList.remove('invisible');
};

//получение массива юзеров из localStorage
export const getFromStorage = function () {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
};

//сохранение юзера в LocalStorage
export const addToStorage = function (obj) {
    const storageData = getFromStorage(storageKey);
    storageData.push(obj);
    localStorage.setItem(storageKey, JSON.stringify(storageData));
};

//создание тестового юзера (на стадии разработки)
export const createTestUser = function () {
    localStorage.clear();
    /*const testUser = new User("7", "7");
    User.save(testUser);*/
};

//создание нового юзера
export const createUser = function (login, password, email, phone) {
    const newUser = new User(login, password, email, phone);
    User.save(newUser);
    appState.currentUser = newUser;
};

//редактирование юзера
export const editingUser = function () {
    const index = appState.currentIndex;
    const usersArr = getFromStorage(storageKey);
    usersArr[index] = appState.currentUser;
    localStorage.clear();
    localStorage.setItem(storageKey, JSON.stringify(usersArr));   
};













    