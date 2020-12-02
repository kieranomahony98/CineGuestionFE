import Validator from 'validator';
import isEmpty from './isEmpty';
export default function ({ name, email, password, password2 }) {
    let registerErrors = {};
    name = !isEmpty(name) ? name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (!Validator.isLength(name, { min: 5, max: 100 })) {
        registerErrors.name = 'Name must be between 5 and 100 characters';
    }
    if (Validator.isEmpty(name)) {
        registerErrors.name = 'Name is a required field';
    }
    if (Validator.isEmpty(email)) {
        registerErrors.email = 'Email is a required field';
    }
    if (!Validator.isEmail(email)) {
        registerErrors.email = 'Invalid Email Address';
    }
    if (Validator.isEmpty(password)) {
        registerErrors.password = 'Please enter a password';
    }
    if (!Validator.isLength(password, { min: 7, max: 15 })) {
        registerErrors.password = 'Password must be between 7 and 15 digits';
    }
    if (!Validator.equals(password, password2)) {
        registerErrors.password = 'Passwords do not match';
    }
    return {
        registerErrors,
        isValid: isEmpty(registerErrors)
    }
}