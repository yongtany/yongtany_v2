import { Router } from 'express';
import validate from 'express-validation';

import * as userControllers from '../controllers/user.controllers';
import validations from '../validations/validations';
import auth from '../middleware/auth';

const router = Router();

router.get('/auth', auth, userControllers.auth);

router.post('/signup', 
  validate(validations.signUp), 
  userControllers.signUp
);

router.post('/signin',
  validate(validations.signIn),
  userControllers.signIn
);

router.get('/logout', auth, userControllers.logout);


export default router;