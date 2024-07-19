import { Router } from "express";
import {admin} from '../controller/admin.mjs';
import express from 'express'
const app=express();

const router = Router();

router.get("/",admin.form);
router.post("/signup",admin.signup);
router.post("/login",admin.login);
router.get("/display",admin.displayList);
router.get("/update",admin.update);
router.get("/insert/:id?",admin.insert);
router.post("/store",admin.store);

export {router}