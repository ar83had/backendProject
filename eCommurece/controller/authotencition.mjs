import {storeUser,findUser} from '../model/auth.mjs';
import jwt from 'jsonwebtoken'

async function signUp(req,res){
    try{
        const data = {"phoneNo":req.body.phoneNo,"pws":req.body.pws};
        const re = await storeUser(data);
        delete data.pws;
        const token = jwt.sign({data},"helo user");
        res.status(200);
        res.json(token);
        res.end();
    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send("Serevr Error");
    }
    res.end();
}

async function login(req,res){
    try{
        const data = {"phoneno":req.body.phoneNo,"pws":req.body.pws};
        const re = await findUser(data);
        if(re){
            const token = jwt.sign({re},"hello user");
            res.json(token);
        }
        else
        {
            res.status(204);
            res.send("unauthoruzed");
        }
    }
    catch(err){
        res.status(500);
        res.send("Server Error");
    }
    res.end();
}

export{signUp,login};