
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

const find = async (collection, query) => {
    const db = await connect();
    return await db.collection(collection).find(query).toArray();
}

const findOne = async (collection, stringId) => {
    const db = await connect();
    return (await db.collection(collection).find({
        _id: new ObjectId(stringId+"")
    }).toArray())[0];
}

const findAll = async (collection) =>{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

const findManyByID = async (collection, findKey, stringId) => {
    const db = await connect();
    return await db.collection(collection).find({ [findKey]: new ObjectId(stringId+"") }).toArray();
}

const findMany = async (collection, queryKey, queryItem) => {
    const db = await connect();
    return await db.collection(collection).find({ [queryKey]: queryItem }).toArray();
}

const updateOne = async (collection, stringId, updateQuery) => {
    const db = await connect();
    return await db.collection(collection).updateOne({ _id: new ObjectId(stringId+"")}, updateQuery);
}

const insertOne = async(collection, objeto) => {
    const db = await connect();
    return await db.collection(collection).insertOne(objeto);
}

module.exports = { find, findOne, findAll, findMany, findManyByID, updateOne, insertOne }