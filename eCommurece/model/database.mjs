import mysql from 'mysql2/promise'

async function con(data){
    const connection = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"11819",
        database:data
    })
    
    connection.connect();
    return connection;
}

export {con};