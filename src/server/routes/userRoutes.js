import { Router } from 'express';

import { signUpValidation, signInValidation } from '../middlewares/userValidation';
import { userSignUp, userSignIn } from '../controllers/userController';
import cheatController from '../controllers/cheatController';
import authenticator from '../middlewares/auth';

const router = Router();

/** User SignUp Route */
router.post('/signup', signUpValidation, userSignUp);

/** User SignIn Route */
router.post('/signin', signInValidation, userSignIn);

/** Get All Cheats Route */
router.get('/cheats', authenticator, cheatController);

export default router;
