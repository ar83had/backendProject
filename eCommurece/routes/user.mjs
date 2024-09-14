import {getallproduct, getfilterProduct,bookItem} from '../controller/users.mjs'
import {Router} from 'express'
import {expressjwt} from 'express-jwt';
const router = Router();

router.get("/all",getallproduct);
router.get("/filter",getfilterProduct);
router.post("/book",expressjwt({algorithms:['HS256'],secret:"hello user"}),bookItem);


export{router}