import { STATUS_CODES } from 'http';

export default {
  authResponse: {
    status: STATUS_CODES[201],
    message: 'Signup is successful',
    payload:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDBiOWRmYjE4ZWZlMTAwNjg4MTQ5MiIsInVzZXJuYW1lIjoidG9iZSIsImlhdCI6MTU0Nzc0NTc1OSwiZXhwIjoxNTQ3NzQ5MzU5fQ.1wWRDPZ3EnCgl9Bpkiq3XFl3aZC5Eh5X_Sz9eaoaDGE'
  },
  authErrorResponse: {
    status: STATUS_CODES[400],
    message: 'Invalid username or password'
  },
  user: {
    exp: 1547749359,
    iat: 1547745759,
    id: '5c40b9dfb18efe1006881492',
    username: 'tobe'
  },
  cheatsResponse: {
    status: STATUS_CODES[200],
    message: 'Retrieved all categories with cheats',
    payload: []
  },
  cheatsErrorResponse: {
    status: STATUS_CODES[500],
    message: 'Oops!. An error occurred'
  }
};
