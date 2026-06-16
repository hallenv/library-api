import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
    throw new Error('Missing MONGODB_URI in environment');
}

if (!dbName) {
    throw new Error('Missing MONGODB_DB in environment');
}

const client = new MongoClient(uri);
await client.connect();

const db = client.db(dbName);

export default db;
export { client };

