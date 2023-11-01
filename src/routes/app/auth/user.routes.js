import { Router } from 'express';
import {
    userRegisterValidator,
    userLoginValidator,
} from '../../../validators/apps/auth/user.validators.js';
import { validate } from '../../../validators/validate.js';
import {
    registerUser,
    loginUser,
} from '../../../controllers/apps/auth/user.controllers.js';
const router = Router();

router.post('/register', userRegisterValidator(), validate, registerUser);
router.get('/', (req, res) => {
    res.send('user');
});
router.route('/login').post(userLoginValidator(), validate, loginUser);

export default router;
