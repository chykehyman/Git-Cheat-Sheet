import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

export default (user, request, response, apiResponse, statusCode, message) => {
  const payload = { id: user._id, username: user.username };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

  request.token = token;

  apiResponse.success(response, statusCode, message, token);
};
