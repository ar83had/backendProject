import {con} from './database.mjs'


async function storeUser(data){
    const database = "ecommurece";
    const db = await con(database);
    const query = `insert into ${database+"users"} values(\"${data.phoneNo}\",\"${data.pws}\")`;
    const re = await db.query(query);
}   


async function findUser(data){
    const database = "ecommurece";
    const db = await con(database);
    const query = `select phoneno from ecommureceusers where phoneno=\"${data.phoneNo}\" and pws=\"${data.pws}\"`;
    const re = await db.query(query);
    return re[0][0];
}



export{storeUser,findUser};