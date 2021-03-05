import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

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
    const {
        user,
        name,
        avatar_url,
        level,
        completed_challenges,
        total_experience,
    } = req.body

    let last_login = new Date()

    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('users')

    let login = await collection.findOne({
        user
    })


    if (!login) {
        //criar login
        await collection.insertOne({
            user,
            name,
            avatar_url,
            level,
            completed_challenges,
            total_experience,
            last_login,
        })

        // procurar login novamente
        login = await collection.findOne({
            user
        })
    } else {
        // atualizar campo último login
        await collection.updateOne(
            { user },
            { $set: { "last_login": last_login } }
        )

        login = await collection.findOne({
            user
        })
    }



    return res.status(201).json({ login })
}