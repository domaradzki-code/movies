"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * This middleware verifies JWT bearer token and adds it to the req.body if exists.
 */
const verifyAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    const bearer = auth === null || auth === void 0 ? void 0 : auth.substring(7);
    if (!auth) {
        res.status(400).send({ error: "No auth provided" });
    }
    else {
        const secret = process.env.JWT_SECRET || 'secret';
        const bearer = auth === null || auth === void 0 ? void 0 : auth.substring(7);
        try {
            const decoded = jsonwebtoken_1.default.verify(bearer, secret);
            req.body.decoded = decoded;
            next();
        }
        catch (err) {
            next(err);
        }
    }
};
exports.verifyAuth = verifyAuth;
