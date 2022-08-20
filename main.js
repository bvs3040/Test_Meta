import { openAuthorization } from "./functions.js";
import { openRegistration } from "./functions.js";
import { openEditing } from "./functions.js";
import { createTestUser } from "./functions.js";
import { createUser } from "./functions.js";
import { authUser } from "./functions.js";
import { State } from "./state.js";
import { editingUser } from "./functions.js";

export const appState = new State(); // сохраняем текущего юзера и индекс
export const authForm = document.querySelector('.authorization'); //форма авторизации
export const regForm = document.querySelector('.registration'); //форма регистрации
export const editingFormsBlock = document.querySelector('.editingFormsBlock'); //блок форм редактирования
export const editingContactsForm = document.querySelector('.editingContactsForm'); //форма редактирования контактов
export const editingPasswordForm = document.querySelector('.editingPasswordForm'); //форма редактирования пароля
export const editingLogin = document.querySelector('.editingLogin');//поле редактирования логина
export const editingPhone = document.querySelector('.editingPhone');//поле редактирования номера телефона
export const editingEmail = document.querySelector('.editingEmail');//поле редактирования емейла
export const editingPassword = document.querySelector('.editingPassword');//поле редактирования
export const editingRepPassword = document.querySelector('.editingRepPassword');//поле повторения пароля


const authorizationLink = document.querySelector('.authorizationLink'); // ссылка в форме авторизации
const registrationLink = document.querySelector('.registrationLink'); // ссылка в форме регистрации
const editingLink = document.querySelector('.editingLink'); // ссылка в форме редактирования


//переходы между окнами 
authorizationLink.addEventListener ('click', openRegistration );
registrationLink.addEventListener ('click', openAuthorization );
editingLink.addEventListener ('click', openAuthorization );


//createTestUser();

//авторизация юзера
authForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const login = authForm.elements.login.value;
    const password = authForm.elements.password.value;
    if (authUser(login, password)){
        openEditing();
    } else {
        confirm("Вы не зарегистрированы! Зарегистрироваться?")
        ? openRegistration() : openAuthorization();
    };
});

// регистрация юзера
regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const login = regForm.elements.login.value;
    const password = regForm.elements.password.value;
    const email = regForm.elements.email.value;
    const phone = regForm.elements.phone.value;
    createUser(login, password, email, phone);
    openEditing();      
});

// редактировнаие контактов
editingContactsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const login = editingContactsForm.elements.login.value;
    const email = editingContactsForm.elements.email.value;
    const phone = editingContactsForm.elements.phone.value;
       
    appState.currentUser.login = login;
    appState.currentUser.phone = phone;
    appState.currentUser.email = email;

    editingUser();
});

//редактирование пароля
editingPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = editingPasswordForm.elements.password.value;
    const repPassword = editingPasswordForm.elements.repPassword.value;
    
    appState.currentUser.password = password;

    editingUser();   
});

