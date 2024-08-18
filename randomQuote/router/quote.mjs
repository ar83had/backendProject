import {Router} from 'express'
import {fn as co} from '../controller/quote.mjs'

const router = Router();

router.post("/signup",co.signUp);
router.post("/signin",co.signIn);
router.get("/generate",co.randomQuote);

export {router};