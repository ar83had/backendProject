import {con} from './mongodb.mjs';

async function get(data){
    const login = await con("movieLogins");
    const re = await login.find(data).toArray();
    return re[0];
}

async function userget(data){
    const db = await con("movieUserLogin");
    const re = await db.find(data).toArray();
    return re[0];
}

const fn = {get,userget}

export{fn}