import User from '../models/userModel';
import apiResponse from '../helpers/apiResponse';
import generateToken from '../helpers/generateToken';

export const userSignUp = async (request, response) => {
  const { username, password } = request.body;

  try {
    const foundUser = await User.findOne({ username: username.toLowerCase() });

    if (foundUser) {
      const message = 'Username is already taken';

      return apiResponse.error(response, 409, message);
    }

    const newUser = new User();
    const hashedPassword = await newUser.generateHash(password);

    const createdUser = await newUser.set({ username, password: hashedPassword }).save();

    if (createdUser)
      return generateToken(
        createdUser,
        request,
        response,
        apiResponse,
        201,
        'Signup is successful'
      );
    return apiResponse.error(response, 400, apiResponse.generalError);
  } catch (error) {
    return apiResponse.error(response, 500, error.message);
  }
};

export const userSignIn = async (request, response) => {
  const { username, password } = request.body;
  const message = 'Invalid username or password';

  try {
    const foundUser = await User.findOne({ username: username.toLowerCase() });
    if (!foundUser) {
      return apiResponse.error(response, 400, message);
    }

    const newUserModel = new User();

    const isValidPassword = await newUserModel.validatePassword(password, foundUser.password);

    if (!isValidPassword) return apiResponse.error(response, 400, message);

    return generateToken(foundUser, request, response, apiResponse, 200, 'Signin is successful');
  } catch (error) {
    return apiResponse.error(response, 500, error.message);
  }
};
