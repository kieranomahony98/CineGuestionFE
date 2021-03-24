import Validator from "validator";
import isEmpty from "./isEmpty";
export default function ({ name, email, currentPassowrd, password, password2, userName }) {
    let updateUserValidation = {};
    name = !isEmpty(name) ? name : "";
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ? password : "";
    currentPassowrd = !isEmpty(currentPassowrd) ? currentPassowrd : "";
    userName = !isEmpty(userName) ? userName : "";

    return {
        updateUserValidation,
        isValid: isEmpty(updateUserValidation)
    }
}

export const userNameValidation = (userName) => {
    userName = !isEmpty(userName) ? userName : "";
    let errors = {};
    if (Validator.isEmpty(userName)) {
        errors.userName = "Please enter a user name";
    }
    if (!Validator.isLength(userName, { min: 5, max: 50 })) {
        errors.userName = "User Name must be between 5 and 50 characters";
    }
    if (userName.indexOf(" ") >= 0) {
        errors.userName = "Please have no spaces in your username";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const nameValidation = (name) => {
    name = !isEmpty(name) ? name : "";
    let errors = {};
    if (!Validator.isLength(name, { min: 5, max: 100 })) {
        errors.name = "Name must be between 5 and 100 characters";
    }
    if (Validator.isEmpty(name)) {
        errors.name = "Name is a required field";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const emailValidation = (email) => {
    email = !isEmpty(email) ? email : "";
    let errors = {};
    if (Validator.isEmpty(email)) {
        errors.email = "Email is a required field";
    }
    if (!Validator.isEmail(email)) {
        errors.email = "Invalid Email Address";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const passwordValidation = (currentPassowrd, password, password2) => {
    currentPassowrd = !isEmpty(currentPassowrd) ? currentPassowrd : "";
    password = !isEmpty(password) ? password : "";
    password = !isEmpty(password2) ? password2 : "";
    let errors = {};
    if (Validator.isEmpty(password)) {
        errors.password = "Please enter a password";
    }
    if (Validator.isEmpty(password2)) {
        errors.password2 = "Please re-enter your new password";
    }
    if (!Validator.isLength(password, { min: 7, max: 15 })) {
        errors.password = "Password must be between 7 and 15 digits";
    }
    if (!Validator.isLength(currentPassowrd, { min: 7, max: 15 })) {
        errors.currentPassowrd = "Password must be between 7 and 15 digits";
    }
    if (Validator.isEmpty(currentPassowrd)) {
        errors.currentPassowrd = "Please enter your current password";
    }
    if (password && password2 && !Validator.equals(password, password2)) {
        errors.password2 = "Passwords do not match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}