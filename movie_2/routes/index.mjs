import {Router} from 'express'
import {main} from '../controller/index.mjs'

const router = Router();

router.get("/",main);

export {router}