import {Router} from 'express';
import {signUp,login} from '../controller/authotencition.mjs';
const router = Router();

router.post("/signup",signUp);
router.post("/login",login);

export{router};
