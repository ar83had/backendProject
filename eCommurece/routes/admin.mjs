import {Router} from 'express';
import { signup,logIn} from '../controller/admin.mjs';

const router = Router();

router.post("/signup",signup);
router.post("/login",logIn);

export {router};