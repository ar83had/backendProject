import {con} from './mongodb.mjs';

async function get(data){
    const login = await con("movieLogins");
    const re = await login.find(data).toArray();
    console.log(re);
    return re[0];
}

const fn = {get}

export{fn}