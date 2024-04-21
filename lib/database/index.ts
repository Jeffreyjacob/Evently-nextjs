import monogoose, { Mongoose } from 'mongoose';

const MONOGODB_URI = process.env.MONOGODB_URI;

interface MongooseConn{
    conn:Mongoose | null,
    promise:Promise<Mongoose> | null
}

let cached:MongooseConn = (global as any).mongoose; 
if(!cached){
    cached = (global as any).mongoose = {
        conn:null,
        promise:null
    }
}

export const connectToDatabase = async ()=>{
    if (cached.conn) return cached.conn;
   
    if(!MONOGODB_URI) throw new Error('MONOGODB_URI is missing');

    cached.promise = cached.promise || monogoose.connect(MONOGODB_URI,{
        dbName:'evently',
        bufferCommands:false,
        connectTimeoutMS:30000
    })

    cached.conn = await cached.promise;

    return cached.conn;
}