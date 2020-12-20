import {jest, describe, expect, it, test} from '@jest/globals'
import request from 'supertest'
import {clearDb} from '../../src/db/dbApi'
import jwt from 'jsonwebtoken'
import { decodedToken } from '../../src/interfaces'
import axios from 'axios'
import * as omdbResponse from '../test_assets/omdbResponse.json';
import {app} from '../../src/app'

describe('Post request route', () => {
    test('all is correct', async() => {
        await clearDb()
        jest.mock('jsonwebtoken')
        jest.mock('axios')
        const mockedToken: decodedToken = {
            userId: 1,
            name: 'test',
            role: 'basic',
            iat: 1,
            exp: 2,
            iss: 'http://localhost',
            sub: 'aa'
        }
        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {return mockedToken})
        jest.spyOn(axios, 'request').mockImplementationOnce(() => Promise.resolve({data: omdbResponse}))
        const res = await request(app)
            .post('/movies/')
            .set({Authorization: 'Bearer some-long-token'})
            .send({
                title: "shrek"
            })
        expect(res.status).toEqual(201)
        expect(res.body.Title).toEqual('Shrek')
    })
})