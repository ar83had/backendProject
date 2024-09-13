import {con} from './database.mjs';


async function allProduct(){
    const database = 'ecommurece';
    const db = await con(database); 
    const query = "select * from  ecommureceproduct";
    const re = await db.query(query);
    return re[0];
}

async function filterProduct(low,up){
    const database = "ecommurece";
    const db = await con(database);
    const query = `select * from ecommureceproduct where price between ${low} and ${up}`;
    const re = await db.query(query);
    console.log(re);
}

export {allProduct,filterProduct};