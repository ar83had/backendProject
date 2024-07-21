import {con} from './database.mjs';
import {movie} from '../views/movieData.mjs'

const fn = 
{
    "signup_store": async function(req,res){
        let query = `select * from movie_admin where email = \"${req.body.email}\"`;
        let re = await con.query(query);
        if(re[0].length!=0 || req.body.psw != req.body.psw_repeat)
            return 0;
        else
        {
            const data =  req.body;
            query = `insert into movie_admin values (\"${data.email}\",\"${data.psw}\")`;
            re =  await con.query(query)
            query = "select * from movie_admin"
            re = await con.query(query);
        }
        return 1;
    },
    "login_store":async function(req,res){
        const data = req.body;
        let query = `select * from movie_admin where email=\"${data.email}\"`
        let re = await con.query(query);
        if(re[0].length===0 || re[0][0].password !== data.psw)
        {
            return 0;
        }
        else
            return 1;
    },
    "findMovie":async function(id)
    {
        console.log(id);
        let re = movie.find((el)=>{return el.movieId==id})
        return re;
    },
    "deleteMov":async function(id){
        let index = movie.findIndex((el)=>{
            return el.movieId==id
        });
        movie.splice(index,1);
    }
}

export{fn}