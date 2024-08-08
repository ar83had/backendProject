import {con} from './mongodb.mjs';

async function get(data){
    const login = await con("login");
    const re = await login.find(data).toArray();
    return re[0];
}

const fn = {get}

export{fn}