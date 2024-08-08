import {Router} from 'express'
import {login} from '../controller/login.mjs'


const router = Router();

router.post("/",login);

export{router};