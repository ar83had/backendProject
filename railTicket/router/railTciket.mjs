import {Router} from 'express';
import {trainInfo} from '../controller/railTicket.mjs';
import {signUp} from '../controller/auth.mjs';

const router = Router();

router.get("/trainInfo/:id",trainInfo);
router.post("/signup",signUp);

export{router};