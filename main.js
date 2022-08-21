import { openAuthorization } from "./functions.js";
import { openRegistration } from "./functions.js";
import { openEditing } from "./functions.js";
import { createTestUser } from "./functions.js";
import { createUser } from "./functions.js";
import { authUser } from "./functions.js";
import { State } from "./state.js";
import { editingUser } from "./functions.js";
import { getFromStorage } from "./functions.js";

export const appState = new State(); // сохраняем текущего юзера и индекс
export const authForm = document.querySelector('.authorization'); //форма авторизации
export const regForm = document.querySelector('.registration'); //форма регистрации
export const editingFormsBlock = document.querySelector('.editingFormsBlock'); //блок форм редактирования
export const editingContactsForm = document.querySelector('.editingContactsForm'); //форма редактирования контактов
export const editingPasswordForm = document.querySelector('.editingPasswordForm'); //форма редактирования пароля
export const editingLogin = document.querySelector('.editingLogin');//поле редактирования логина
export const editingPhone = document.querySelector('.editingPhone');//поле редактирования номера телефона
export const editingEmail = document.querySelector('.editingEmail');//поле редактирования емейла
export const storageKey = "users"; // ключ хранения в LocalStorage


const authorizationLink = document.querySelector('.authorizationLink'); // ссылка в форме авторизации
const registrationLink = document.querySelector('.registrationLink'); // ссылка в форме регистрации
const editingLink = document.querySelector('.editingLink'); // ссылка в форме редактирования


//переходы между окнами 
authorizationLink.addEventListener ('click', openRegistration );
registrationLink.addEventListener ('click', openAuthorization );
editingLink.addEventListener ('click', openAuthorization );


//createTestUser(); // создание тестового юзера

//поля для сообщений валидации
const inputFields = document.querySelectorAll('input');
const errorMessageFields = document.querySelectorAll('.errorMessage');
const errorMessageLines = document.querySelectorAll('.inpHr');
const inputIcons = document.querySelectorAll('.input-icon');

for (let i = 0; i < inputFields.length; i++) {

//иконки глаза, скрыть/открыть пароль
    if (inputFields[i].classList.contains("password")) {
        inputIcons[i].addEventListener ('click', () => {
            inputIcons[i].classList.toggle ('input-icon__eye');
            inputIcons[i].classList.toggle ('input-icon__eye2'); 

            inputIcons[i].classList.contains ('input-icon__eye2') 
            ? inputFields[i].removeAttribute ('type')
            : inputFields[i].setAttribute('type', 'password');
        });
    };

//блок сообщений валидации
    inputFields[i].addEventListener ('blur', () =>{
        const inputFieldValue = inputFields[i].value;

        if (inputFields[i].classList.contains("inputLogin")) {
            if (/^[a-zA-Z1-9]{6,20}$/.test(inputFieldValue) === false) {
                errorMessageFields[i].innerHTML = 'Допустимы цифры и латинские буквы. От 6 до 20 символов!';
                errorMessageLines[i].classList.add('redLine'); 
                inputIcons[i].classList.remove('input-icon__done'); 
                inputIcons[i].classList.add('input-icon__close');  
            } else {
                inputIcons[i].classList.remove('input-icon__close');
                inputIcons[i].classList.add('input-icon__done');
            }; 

            const usersArr = getFromStorage(storageKey);
            usersArr.forEach(element => {
                if (element.login == inputFieldValue && i>0) {
                    errorMessageFields[i].innerHTML = 'Такой логин уже зарегистрирован';
                    errorMessageLines[i].classList.add('redLine'); 
                    inputIcons[i].classList.remove('input-icon__done'); 
                    inputIcons[i].classList.add('input-icon__close'); 
                    inputFields[i].value = '';
                };
            })
        }; 

        if (inputFields[i].classList.contains("password")) {
            if (/^[\D0-9]{6,20}$/.test(inputFieldValue) === false) {
                errorMessageFields[i].innerHTML = 'Допустимы любые символы и цифры. От 6 до 20 символов!';
                errorMessageLines[i].classList.add('redLine');    
            };       
        };

        if (inputFields[i].classList.contains("email")) {
            if (/^[a-zA-Z0-9-]+@[a-z0-9\.-]+\.[a-z]{2,4}$/.test(inputFieldValue) === false) {
                errorMessageFields[i].innerHTML = 'Формат адреса: example@gmail.com';
                errorMessageLines[i].classList.add('redLine'); 
                inputIcons[i].classList.remove('input-icon__done'); 
                inputIcons[i].classList.add('input-icon__close');  
            } else {
                inputIcons[i].classList.remove('input-icon__close');
                inputIcons[i].classList.add('input-icon__done');
            };       
        };

        if (inputFields[i].classList.contains("tel")) {
            if (/^\+7\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/.test(inputFieldValue) === false) {
                errorMessageFields[i].innerHTML = 'Формат номера: +7 (999) 999 99 99';
                errorMessageLines[i].classList.add('redLine');
                inputIcons[i].classList.remove('input-icon__done'); 
                inputIcons[i].classList.add('input-icon__close');  
            } else {
                inputIcons[i].classList.remove('input-icon__close');
                inputIcons[i].classList.add('input-icon__done');    
            };       
        }; 

        if (inputFields[i].classList.contains("repeatPassword")) {
            if (inputFieldValue !== inputFields[i-1].value) {
                errorMessageFields[i].innerHTML = 'Пароли не совпадают!';
                errorMessageLines[i].classList.add('redLine'); 
                inputFields[i].value = ''; 
            };       
        }; 
        
    });

    inputFields[i].addEventListener ('focus', () =>{
        //inputFields[i].value = '';
        errorMessageFields[i].innerHTML = '';
        errorMessageLines[i].classList.remove('redLine');            
    });     
};

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

    authForm.elements.login.value = '';
    authForm.elements.password.value = '';

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
    
    regForm.elements.login.value = '';
    regForm.elements.password.value = '';
    regForm.elements.repPassword.value = '';
    regForm.elements.email.value = '';
    regForm.elements.phone.value = '';

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
    editingContactsForm.elements.repPassword.value = '';
});

//редактирование пароля
editingPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = editingPasswordForm.elements.password.value;
    const repPassword = editingPasswordForm.elements.repPassword.value;
    
    appState.currentUser.password = password;

    editingUser();
    editingPasswordForm.elements.password.value = '';  
    editingPasswordForm.elements.repPassword.value = '';
});

