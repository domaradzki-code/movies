import express from 'express'
import jwt from 'jsonwebtoken'
import { decodedToken } from '../interfaces'

export const verifyAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const auth = req.headers.authorization?.substring(7)   
    if (!auth) {
        res.status(400).send({error: "No auth provided"})
    }
    else {
        const secret: string = process.env.JWT_SECRET || 'secret';
        try {
            const decoded = jwt.verify(auth, secret)
            req.body.decoded = decoded
            next()
        }
        catch (err) {
            next(err)
        }
    }
}