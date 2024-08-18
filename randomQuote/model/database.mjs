import {MongoClient} from 'mongodb';

class database{
    #url;#collection;#database;
    
    constructor(url,data){
        this.#url=url,
        this.#database=data
    }

    async con(col){
        this.#collection=col;
        const client = new MongoClient(this.#url);
        await client.connect();

        let db = await client.db(this.#database);
        return db.collection(this.#collection);
    }
}

const db = new database("mongodb://localhost:27017/","node");

export {db};