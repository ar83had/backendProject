import {database} from './database.mjs';
const signup = await database("railwayuser","signup");
const train = await database("railwaytrain","traininfo");

async function gettrainInfo(id){

    let re = await train.find({"trainId":id},{_id:0});
    return re[0];
}
async function storeUser(phoneNumber,password){
    try{
        const data = {
            "phoneNumber":phoneNumber,
            "password":password
        }
    
        let re = await signup.insertMany(data);
        return false;
    }
    catch(err){
        if(err.code == 11000)
            return err.code;
        else
        {
            return 1;
        }

    }
}

async function findUser(phoneNumber,password){
    const data = {"phoneNumber":phoneNumber,"password":password}
    const re =  await signup.find(data);
    return re[0];
}

async function find(id){
    const re = await train.find({"trainId":id});
    return re[0];
}

async function update(data,ticket){
    await train.updateMany({"trainId":data.trainId},{$inc:{"ticketCount":-data.ticketCount}});
    const phoneNumber = ticket.phoneNumber;
    delete ticket.phoneNumber;
    await signup.updateMany({"phoneNumber":phoneNumber},{$set:{"ticket":ticket}});
    const re = signup.find({"phoneNumber":phoneNumber},{"__v":0,_id:0,"password":0});
    return re;
}

export {gettrainInfo,storeUser,findUser,find,update};