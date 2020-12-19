"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth = (req, res, next) => {
    var _a;
    const auth = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.substring(7);
    if (!auth) {
        res.status(400).send({ error: "No auth provided" });
    }
    else {
        const secret = process.env.JWT_SECRET || 'secret';
        try {
            const decoded = jsonwebtoken_1.default.verify(auth, secret);
            req.body.decoded = decoded;
            next();
        }
        catch (err) {
            next(err);
        }
    }
};
exports.verifyAuth = verifyAuth;
