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
    const {
        user,
        level,
        currentExperience,
        totalExperience,
        challengesCompleted,
    } = req.body

    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('users')

    let login = await collection.findOne({
        user
    })


    if (!login) {
        // retornar status 401
        return res.status(401).json({ message: 'Usuário não encontrado' })

    } else {
        // atualizar usuário
        await collection.updateOne(
            { user },
            {
                $set: {
                    "level": Number(level),
                    "completed_challenges": Number(challengesCompleted),
                    "current_experience": Number(currentExperience),
                    "total_experience": Number(totalExperience)
                }
            }
        )
    }

    return res.status(201).json({ message: 'Usuário atualizado com sucesso' })
}