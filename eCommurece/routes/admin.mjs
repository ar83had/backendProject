import {Router} from 'express';
import { signup,logIn, addProduct} from '../controller/admin.mjs';
import {expressjwt} from 'express-jwt'

const router = Router();

router.post("/signup",signup);
router.post("/login",logIn);
router.post("/addproduct",expressjwt({algorithms:['HS256'],secret:"hello admin"}),addProduct);

export {router};