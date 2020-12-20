import express from 'express'
import jwt from 'jsonwebtoken'

/**
 * This middleware verifies JWT bearer token and adds it to the req.body if exists.
 */

export const verifyAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const auth = req.headers.authorization
    const bearer = auth?.substring(7)
    if (!auth) {
        res.status(400).send({error: "No auth provided"})
    }
    else {
        const secret: string = process.env.JWT_SECRET || 'secret';
        const bearer = auth?.substring(7)
        try {
            const decoded = jwt.verify(bearer, secret)
            req.body.decoded = decoded
            next()
        }
        catch (err) {
            next(err)
        }
    }
}