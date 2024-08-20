import {Router} from 'express';
import {trainInfo,booking} from '../controller/railTicket.mjs';
import {signUp,signIn,signOut} from '../controller/auth.mjs';

const router = Router();

router.get("/trainInfo/:id",trainInfo);
router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.post("/booking",booking);


export{router};