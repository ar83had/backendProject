import {Router} from 'express'
import {login,userLogin} from '../controller/login.mjs'


const router = Router();

router.post("/",login);
router.post("/login",userLogin);

export{router};