import mysql from "mysql2/promise";

export default async function con(data){
    const connection = await mysql.createConnection({
        "host":"localhost",
        "user":"root",
        "password1":"11819",
        "database":data
    });

    connection.connect();
    return connection;
}