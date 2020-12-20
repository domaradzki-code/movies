import { Url } from "url";

export interface MovieDetails {
    Title: string;
    Released: number;
    Genre: string;
    Director: string;
}

export interface dbObject {
    Title: string
    Released: number
    Genre: string
    Director: string
    User: string
    Timestamp: string
}

export interface decodedToken {
    userId: number
    name: string
    role: 'basic' | 'premium'
    iat: number
    exp: number
    iss: string
    sub: string
}