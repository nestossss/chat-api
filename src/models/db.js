
require('dotenv').config()
const {MongoClient, ObjectId} = require('mongodb')

const connect = async () => {
    let singleton;
    if(singleton) return singleton;
    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();
    singleton = client.db(process.env.DB_NAME);
    return singleton;
}

const findAll = async (collection) =>{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

const findMany = async (collection, findKey, stringId) => {
    const db = await connect();
    return await db.collection(collection).find({ [findKey]: new ObjectId(stringId+"") }).toArray();
}

const insertOne = async(collection, objeto) => {
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

module.exports = { findAll, findMany, insertOne }