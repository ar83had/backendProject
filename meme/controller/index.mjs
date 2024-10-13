import {storeUser,verifyUser,fetchdata} from '../model/index.mjs'
import jwt from 'jsonwebtoken';

async function signUp(req,res){
    try{
        const data = {
            "username":req.body.username,
            "password":req.body.password
        }
    
        let result = await storeUser(data);
        delete data.password;
        const token = jwt.sign(data,"hello user");
        res.send({"token":token});
    }
    catch(err){
        if(err.errno==1062){
            res.send("You Have Already an account");
        }
        else
        {
            res.send("Server error");
            res.status(500);
        }
    }

    res.end();
};

async function signIn(req,res){
    try{
        const data={
            "username":req.body.username,
            "password":req.body.password
        }
        const  result = await verifyUser(data);
        
        let token=""
        if(result.length>0){
            token=jwt.sign(result[0],"hello user");
            res.send({"token":token});
        }
        else
        {
            res.send("Unauthorized");
        }
    }
    catch(err){
        res.send("Server Error");
    }

    res.end();
}

async function data(req,res){
    try{

            const result = await fetchdata();
            res.send(result);
    }
    catch(err){
        console.log(err);
        res.send("Server Error");
        res.status(500);
    }
    res.end();
}

export {signUp,signIn,data}