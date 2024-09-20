import { findUser, storeUser } from "../model/auth.mjs"
import jwt  from "jsonwebtoken";

async function signup(req,res){
    try{        
        const data = {
            "phoneNo":req.body.phoneNo,
            "pws":req.body.pws
        }
        const re = await storeUser(data);
        delete data.pws;
        const token = jwt.sign(data,"hello admin");
        res.status(200);
        res.json(token);
    }
    catch(error){
        if(error.errno==1062){
            res.send("Alredy Signup");
        }
        else{
            res.send("Server Error");
            res.status(500);
        }
        console.log(error);
    }
    res.end();
}

async function logIn(req,res){
    try{
        const data = {
            "phoneNo":req.body.phoneNo,
            "pws":req.body.pws
        }
    
        const re = await findUser(data);
        if(re){
            const token = jwt.sign(re,"hello admin");
            res.json(token);
        }
        else
        {
            res.status(204);
            res.send("Unauthorized");
        }
    }
    catch(err){
        res.status(500);
        res.send("Server Eror");
    }
    res.end();
}

export{signup,logIn}