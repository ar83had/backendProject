import jwt from 'jsonwebtoken'
import {fn as model} from '../model/teacher.mjs'
import jsonXml from 'jsontoxml';

function final(res,json){
    res.format({
        json(){
            res.json(json);
        },
        xml(){
            res.send(jsonXml(json));
        },
        default(){
            res.json(json);
        }
    })
}

function catchErr(res,err,code,body){
    console.log(err);
    res.status(code);
    res.send(body);
}

async function login(req,res){

    try{
        const data = {
            "userName":req.body.userName,
            "password":req.body.password
        }

        const user = await model.get(data);
    
        if(user){
            delete user.password;
            const token = jwt.sign(user,"helloteacher");
            final(res,{"token":token});
        }
        else
        {
            console.log("Unauthorized");
            res.status(401);
            res.send("Unauthorized");
        }
        res.end();
    }
    catch(err){
        catchErr(res,err,401,"Unauthorized");
        res.end();
    }
}

async function studentlist(req,res){

    try{
        const students = await model.studentList();
        const data = {
            "students":students,
            "links":[
                {"ref":"self","href":req.baseUrl+"/studentlist"}
            ]
        }
    
        final(res,data);
    }
    catch(err){
        catchErr(res,err,404,"Not Found");
        res.end();
    }
}

async function addStudent(req,res){

    try{
        const data = {
            "studentId":req.body.studentId,
            "studentName":req.body.studentName,
            "studentCourse":req.body.studentCourse,
            "studentAddress":req.body.studentAddress
        }
    
        let re = model.addStudent(data);
        res.status(201);
        res.end();
    }
    catch(err){
        catchErr(res,err,504,"Server Error");
        res.end();
    }
}

async function modifyStudent(req,res){
    try{
        const id = req.params.id;
        const data = {
            "studentId":req.body.studentId,
            "stdentName":req.body.studentName,
            "studentCourse":req.body.studentCourse,
            "studentAddress":req.body.studentAddress
        }

        let re = await model.updateStudent(id,data);
        if(re.matchedCount==0){
            catchErr(res,"rsource not found",204,"Rourse not found");
        }
        else
        {
            const json = {
                "Student":data,
                "links":[
                    {"rel":"self","href":req.baseUrl+"/mofidystudent/"+id}
                ]
            };

            final(res,json);
        }

        res.end();
    }
    catch(err){
        catchErr(res,err,504,"Server Error");
        res.end();
    }
}

async function deleteStudents(req,res){
    try{
        const id = req.params.id;
        let re = await model.deleteStudents(id);
    
        if(re.deletedCount==0){
            res.status(204);
        }
        else
        {
            res.status(200);
            res.send("delete Successfully");
        }
    
        res.end();
    }
    catch(err){
        catchErr(res,err,504,"Server Error");
        res.end();
    }
}

const fn = {login,studentlist,addStudent,modifyStudent,deleteStudents}

export{fn}
export{final,catchErr};