import mysql from "mysql2/promise"

const con = await mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'11819',
        database:'node'
    }
)

export {con}