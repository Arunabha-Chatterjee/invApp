import express from 'express';
const router = express.Router();
import validate from '../validators/validate.js';

import {registrationValidator, loginValidator} from '../validators/authValidators.js';

import {register, login} from '../controllers/authController.js';

router.post('/register', registrationValidator, validate, register);
router.post('/login', loginValidator, validate, login);

export default router;