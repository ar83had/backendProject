import {getallproduct, getfilterProduct} from '../controller/users.mjs'
import {Router} from 'express'
const router = Router();

router.get("/all",getallproduct);
router.get("/filter",getfilterProduct);

export{router}