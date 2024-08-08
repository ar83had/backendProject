import {con} from './database.mjs';

async function authUser(data){
    const students = await con("collageStudentsLogin");
    let re = await students.find(data).toArray();
    return re[0];
}

async function getStudent(data){
    const student = await con("collageStudents");
    let re = await student.find(data).toArray();
    return re[0];
}

const fn ={authUser,getStudent};

export {fn};