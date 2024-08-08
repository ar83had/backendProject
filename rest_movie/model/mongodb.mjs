import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";

const con = async function(collection){
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("node");
    return db.collection(collection);
}

export{con}