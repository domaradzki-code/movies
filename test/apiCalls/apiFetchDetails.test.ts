import {apiFetchDetails} from '../../src/apiCalls/apiFetchDetails'
import {describe, it, jest, expect} from '@jest/globals'
import axios from 'axios'
import * as omdbResponse from '../test_assets/omdbResponse.json';

jest.mock('axios')
//const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('apiFetchDetails', () => {
    it('fetches successfully from omdb API', async() => {
        const data = omdbResponse
        const target = {
            Title: data.Title,
            Released: data.Year,
            Genre: data.Genre,
            Director: data.Director
        }
        jest.spyOn(axios, 'request').mockImplementationOnce(() => Promise.resolve({data: data}))
        await expect(apiFetchDetails('shrek')).resolves.toEqual(target)
    });
    it('handles network error', async () => {
        jest.spyOn(axios, 'request').mockImplementationOnce((() => Promise.reject(new Error("Connection error"))))
        await expect(apiFetchDetails('shrek')).rejects.toThrow("Connection error")
    })
})