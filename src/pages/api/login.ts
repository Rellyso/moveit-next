import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'


export default (req: NowRequest, res: NowResponse) => {
    const { user } = req.body

    return res.json({ message: `Olá ${user}` })
}