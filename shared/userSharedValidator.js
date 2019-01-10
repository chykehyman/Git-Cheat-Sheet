import validator from 'validator';
import isEmpty from 'is-empty';

const validateUsername = username => {
  let error;

  if (!validator.isEmpty(username)) {
    if (!validator.toInt(username)) {
      if (!validator.isLength(username, { min: 3, max: 25 })) {
        error = 'Username must be at least 3 to 25 characters';
      }
    } else {
      error = 'Username must not start with a number';
    }
  } else {
    error = 'Username is required';
  }

  return error;
};

const validatePassword = (password, confirmPassword = undefined) => {
  let error;
  if (!validator.isEmpty(password.trim())) {
    if (typeof confirmPassword !== 'undefined') {
      if (validator.isLength(password.trim(), { min: 6, max: 30 })) {
        if (!validator.equals(password.trim(), confirmPassword.trim())) {
          error = 'Passwords do not match';
        }
      } else {
        error = 'Password length must be between 6 and 30';
      }
    }
  } else {
    error = 'Password is required';
  }

  return error;
};

const getErrors = (usernameError, passwordError) => {
  const errors = {};
  if (usernameError) errors.username = usernameError;
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const signUpValidator = userData => {
  const usernameError = validateUsername(userData.username);
  const passwordError = validatePassword(userData.password, userData.confirmPassword);

  const errors = getErrors(usernameError, passwordError);

  const isValid = isEmpty(errors);

  return { errors, isValid };
};

export const signInValidator = userData => {
  const usernameError = validateUsername(userData.username.trim());
  const passwordError = validatePassword(userData.password.trim());

  const errors = getErrors(usernameError, passwordError);

  const isValid = isEmpty(errors);

  return { errors, isValid };
};
