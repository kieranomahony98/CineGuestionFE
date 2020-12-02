import Validator from 'validator';
import isEmpty from './isEmpty';
function loginValidation({ name, email, password }) {
    let loginErrors = {};
    name = !isEmpty(name) ? name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (Validator.isEmpty(email)) {
        loginErrors.email = 'Email is a required field';
    }
    if (!Validator.isEmail(email)) {
        loginErrors.email = 'Invalid Email Address';
    }
    if (Validator.isEmpty(password)) {
        loginErrors.password = 'Please enter a password';
    }
    if (!Validator.isLength(password, { min: 7, max: 15 })) {
        loginErrors.password = 'Password must be between 7 and 15 digits';
    }

    return {
        loginErrors,
        isValid: isEmpty(loginErrors)
    }
}
export default loginValidation;