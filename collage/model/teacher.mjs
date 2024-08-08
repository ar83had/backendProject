import {con} from './database.mjs';

async function get(data){
    const col = await con("collagelogin");
    const result = await col.find(data).toArray();
    return result[0];
}

async function studentList(order){
    const student = await con("collageStudents");

    const re=await student.find().toArray();

    return re;
}

async function addStudent(data){
    const student = con("collageStudents");
    return (await student).insertOne(data);
}

async function updateStudent(id,data){
    const student = await con("collageStudents");
    let re = student.updateOne({"studentId":id},{$set:data});
    return re;
}

async function deleteStudents(id){
    const student = await con("collageStudents");
    let re = await student.deleteMany({"studentId":id});
    return re;
}

const fn ={get,studentList,addStudent,updateStudent,deleteStudents};

export {fn};