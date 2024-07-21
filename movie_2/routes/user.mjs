import Router from 'express'
import {user} from '../controller/user.mjs'

const router = Router();

router.get("/display",user.display);
router.get("/",user.main);
router.get("/ticket",user.ticket);
router.get("/ticket/booking/:id",user.booking);
router.post("/ticket/booking",user.store);

export {router}