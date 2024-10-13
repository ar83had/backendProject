import {Router} from 'express';
import {signUp,signIn,data} from '../controller/index.mjs';
import {expressjwt} from 'express-jwt'

const router = Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/meme/data",expressjwt({algorithms:['HS256'],secret:"hello user"}),data);

export default router;