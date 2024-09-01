import jwt from 'jsonwebtoken';
import {fn as model} from '../model/login.mjs'

async function login(req,res){
    try{
        const credentials = {
            "username":req.body.username,
            "password":req.body.password
        }
        
        const user = await model.get(credentials);
        if(user)
        {
            delete user.password;
            const token = jwt.sign(user,"secret");
            res.json({"token":token});
        }
        else
        {
            res.status(401);
            res.send("Unauthorized ");
        }
        res.end();
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Unauthorized !");
        res.end();
    }
}

async function userLogin(req,res){
    try{
        const data = {
            "username":req.body.username,
            "password":req.body.password
        }
        console.log(data);
        const user = await model.userget(data);
        console.log(user);
        if(user){
            delete user.password;
            const token = jwt.sign(user,"hello user");
            res.json(token);
        }
        else
        {
            res.status(204);
            res.send("unauthorized");
        }
        res.end();
    }
    catch(err){
        res.status(500);
        res.send("Server error");
        res.end();
    }
}

export{login,userLogin};