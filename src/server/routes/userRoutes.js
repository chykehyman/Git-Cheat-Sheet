import { Router } from 'express';

import { signUpValidation, signInValidation } from '../middlewares/userValidation';
import { userSignUp, userSignIn } from '../controllers/userController';

const router = Router();

/** User SignUp Route */
router.post('/signup', signUpValidation, userSignUp);

/** User SignIn Route */
router.post('/signin', signInValidation, userSignIn);

export default router;
