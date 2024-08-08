import {fn as model} from '../model/student.mjs';
import {final,catchErr} from './teacher.mjs';
import jwt from 'jsonwebtoken'; 


async function auth(req,res){
    try{
        const data={
            "studentId":req.body.studentId,
            "password":req.body.password
        }
    
        let user = await model.authUser(data);
        if(user){
            delete user.password;
            delete user._id;
            const token = jwt.sign(user,"hellostudent");
            final(res,{"token":token});
        }
        else
        {
            res.status(401);
            res.send("Unauthorized");
            res.end();
        }
    }
    catch(err){
        catchErr(res,err,500,"Server Error");
        res.end();
    }
}

async function details(req,res){
    try{
        const id = req.auth.studentId;
        const student = await model.getStudent({"studentId":id});
        if(student){
            const json ={
                "Details":student,
                "links":[
                    {"rel":"self","href":req.baseUrl+"/details"}
                ]
            }
            res.json(json);
        }
        else
        {
            res.status(204);
            res.send("Data is not found");
        }
        res.end();
    }
    catch(err){
        catchErr(res,err,500,"Srver Error");
        res.end();
    }

}

const fn ={auth,details};

export {fn};