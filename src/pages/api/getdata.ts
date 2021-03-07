import { NowRequest, NowResponse } from '@vercel/node'
import { Db, MongoClient } from 'mongodb'


let cachedDb: Db = null

async function connectToDatabase(uri: string) {
    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const url = new URL(uri)

    const dbName = url.pathname.substr(1)



    const db = client.db(dbName)

    cachedDb = db

    return db
}

export default async (req: NowRequest, res: NowResponse) => {

}