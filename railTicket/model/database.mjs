import mongoose from 'mongoose';

// await mongoose.connect("mongodb://localhost:27017/node");

// const trainSchema = new mongoose.Schema({
//     trainId:{
//         type:String,
//         require:true
//     },
//     ticket:{
//         type:Number,
//         require:true
//     }
// });

// const userSchema = new mongoose.Schema({
//     phoneNumber:{
//         type:String,
//         require:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         require:true
//     },
//     ticketid:{
//         type:String,
//     },
//     trainId:{
//         type:String
//     }
// });

class Database{
    url="mongodb://localhost:27017/node";
    database="node";
    collection;

    constructor(col){
        this.collection=col;
    }

    signSchema={
        phoneNumber:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true
        },
        ticket:{
            type:Object
        }
    }

    trainSchema={
        trainId:{
            type:String,
        },
        ticketCount:{
            type:Number
        }
    }
}

const database = async function(coll,schema){

    const database = new Database(coll);
    mongoose.connect(database.url);
    if(coll==="railwaytrain" && schema==="traininfo")
        return mongoose.model(coll,database.trainSchema);
    else if(coll==="railwayuser" && schema==="signup")
        return mongoose.model("railwayuser",database.signSchema);
};

export {database};