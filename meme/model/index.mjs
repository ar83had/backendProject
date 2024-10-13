import con from './databse.mjs';

async function storeUser(data){
    const database=await con("Pmeme");
    let query  = `insert into users value(\"${data.username}\",\"${data.password}\")`;
    let result = await database.query(query);
    return result;
}   

async function verifyUser(data){
    const database = await con("Pmeme");
    let query = `select username from users where username=\"${data.username}\" and password=\"${data.password}\"`
    const result = await database.query(query);
    return result[0];
}

async function fetchdata(){
    const database = await con("Pmeme");
    const result = await database.query("select * from data");
    return result[0];
}


export {storeUser,verifyUser,fetchdata}