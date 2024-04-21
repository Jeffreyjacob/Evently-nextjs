import monogoose from 'mongoose';

const MONOGODB_URI = process.env.MONOGODB_URI;

let cached = monogoose || {connect:null,Promise:null};

export const connectToDatabase = async ()=>{
    if(cached.connect) return cached.connect;
    if(!MONOGODB_URI) throw new Error('MONOGODB_URI is missing');

    cached.Promise = cached.Promise || monogoose.connect(MONOGODB_URI,{
        dbName:'evently',
        bufferCommands:false
    })

    cached.connect = await cached.Promise;

    return cached.connect;
}