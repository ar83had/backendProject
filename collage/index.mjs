import express from 'express'
import {router as teacher} from './router/teacher.mjs';
import {router as student} from './router/student.mjs';

import {expressjwt} from 'express-jwt';
console.log("hi");

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello arshad bhai it is /");
    res.end();
});

app.get("/publish",(req,res)=>{
    res.send("hello arshad bhai it is /publish");
    res.end();
});

app.use("/collage/teacher/login",teacher);
app.use("/collage/student/login",student);

app.use("/collage/teacher",expressjwt({secret:"helloteacher",algorithms:['HS256']}),teacher);
app.use("/collage/student",expressjwt({"secret":"hellostudent","algorithms":['HS256']}),student);
app.use((err,req,res,next)=>{
    if(err.name=="UnauthorizedError"){
        console.log("unauthorizedError");
        res.status(401);
        res.send("Unauthorized");
        res.end();
    }
    else
        next();
})

// app.listen(2000,(err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log("Server connected on port number 2000");
// })

