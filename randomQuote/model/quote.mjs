import {db as database} from './database.mjs'; 
import nodemailer from 'nodemailer';

async function addUser(data){
    const db = await database.con("quotelogins");

    let re = db.insertOne(data);

    return re;
}

async function auth(data){
    const quote = await database.con("quotelogins");

    let re = await quote.aggregate([{$match:data},{$project:{_id:0,"email":1}}]).toArray();

    return re[0];
}

async function get(id){
    const quotes = await database.con("quotes");
    const re = await quotes.aggregate([{$match:{"quoteId":id}},{$project:{"quote":1,"_id":0}}]).toArray();
    return re;
}

async function sendEmail(data,res){
    const db = await database.con("quotelogins");
    const password = ((await db.find({"email":data.from}).toArray())[0]).password;
    const transpoter = nodemailer.createTransport({
        "host":"smtp.ethereal.email",
        "port":587,
        "secure":false,
        "auth":{
            "user":data.from,
            "pass":password
        }
    });

    const mail = {
        from:data.from,
        to:data.to,
        subject:data.subject,
        text:data.body
    }

    transpoter.sendMail(mail,(err,info)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.send("Mail failer");
        }
        else
        {
            console.log(info.response);
        }
    });
}

const fn = {addUser,auth,get,sendEmail};

export{fn};