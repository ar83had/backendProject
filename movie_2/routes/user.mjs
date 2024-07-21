import Router from 'express'
import {user} from '../controller/user.mjs'

const router = Router();

router.get("/display",user.display);
router.get("/",user.main);

export {router}