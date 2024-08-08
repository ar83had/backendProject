import {Router} from 'express'
import {fn as cont} from '../controller/student.mjs';

const router = Router();

router.post("/",cont.auth);
router.get("/details",cont.details)

export{router};