import {Router} from 'express'
import {fn as cont} from '../controller/teacher.mjs'
import express from 'express';

const router = Router();
const app=express();


router.post("/",cont.login);
router.get("/studentlist",cont.studentlist);
router.post("/addstudent",cont.addStudent);
router.put("/modifystudent/:id",cont.modifyStudent);
router.delete("/deleteStudents/:id",cont.deleteStudents);

export{router};