import {con} from './database.mjs';

async function storeProduct(data){
    const db=await con("ecommurece");
    const query = `insert into ecommureceproduct values (${data.id},\"${data.name}\",${data.price})`;
    const re = await db.query(query);
    return re;
}

export {storeProduct};