import {fn as model} from '../model/quote.mjs';
import {Token} from './auth.mjs';
import jsonXml from 'jsontoxml';


async function final(res,data){
    res.format({
        json(){
            res.json(data);
        },
        xml(){
            res.send(jsonXml(data));
        }
    });
}

async function response(res,code,body){
    res.status(code);
    if(body)
        res.send(body)
    res.end();
}

async function signUp(req,res){

    try{
        const data = {
            "email":req.body.email,
            "password":req.body.password,
            "age":req.body.age,
            "gender":req.body.gender
        }
    
        const re = await model.addUser(data);
        if(re.acknowledged===true){
            const token = new Token();
            delete data.password;
            delete data.age;
            delete data.gender;
            delete data._id;
            token.data = data;
            const json = {
                "token":await token.getToken(),
                "links":[
                    {"rel":"self","href":req.baseUrl+"/signup"}
                ]
            };

            final(res,json);
            response(res,200);
        }
        else{
            response(res,500,"Server Error");
        }
    }
    catch(err){
        console.log(err);
        response(res,500,"Server Error");
    }
}

async function signIn(req,res){
    try{
    
        const data = {
            "email":req.body.email,
            "password":req.body.password
        }
        let re = await model.auth(data);
         
        if(re){
            delete re.password;
            const token = new Token();
            token.data=re;
            const json = {
                "token":await token.getToken(),
                "link":[
                    {"rel":"self","href":req.baseUrl+"/signup"}
                ]
            };

            final(res,json);
            response(res,200);
        }
        else{
            response(res,401,"Unauthonticated");
        }
    }
    catch(err){
        console.log(err);
        response(res,500,"Servaer Error");
    }
}

async function randomQuote(req,res){
    try{
        let id = Math.round(Math.random()*50);
        
        const quotes = await model.get(id);
    
        if(quotes){
            const data = {
                "to":"arshadshmim786@gmail.com",
                "subject":"Random Quote",
                "body":(quotes[0]).quote,
                "from":req.auth.email
            }

            model.sendEmail(data,res); 
            const json = {

                "quote":quotes,
                "links":[
                    {"rel":"self","href":req.baseUrl+"/quote"}
                ]
            }
            final(res,json);
            response(res,200);
            res.end();
        }
        else
        {
            randomQuote(req,res);
        }
    }
    catch(err){
        console.log(err);
        response(res,500,"Server Error");
    }
}

const fn = {signUp,signIn,randomQuote};

export{fn};