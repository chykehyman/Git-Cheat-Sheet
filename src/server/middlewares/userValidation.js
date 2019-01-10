import { signUpValidator, signInValidator } from '../../../shared/userSharedValidator';
import apiResponse from '../helpers/apiResponse';

export const signUpValidation = (request, response, next) => {
  const { errors, isValid } = signUpValidator(request.body);

  if (!isValid) return apiResponse.error(response, 400, errors);
  return next();
};

export const signInValidation = (request, response, next) => {
  const { errors, isValid } = signInValidator(request.body);

  if (!isValid) return apiResponse.error(response, 400, errors);
  return next();
};
