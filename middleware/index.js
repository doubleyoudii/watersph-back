"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// function verifyToken(req: Request, res: Response, next: NextFunction) {
const verifyToken = (req, res, next) => {
    try {
        //Do something in Token
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            const salt = process.env.JWT_SALT_ADMIN;
            jsonwebtoken_1.default.verify(req.body.token, 
            // "testsecret",
            salt, (err, authData) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.status(403).json({
                        message: "Forbidden"
                    });
                }
                else {
                    req.body.user = authData;
                    next();
                }
            }));
        }
        else {
            res.status(403).json({
                message: "Forbidden 2"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Forbidden"
        });
    }
};
const verifyTokenMember = (req, res, next) => {
    try {
        //Do something in Token
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            const salt = process.env.JWT_SALT_MEMBER;
            jsonwebtoken_1.default.verify(req.body.token, salt, (err, authData) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.status(403).json({
                        message: "Forbidden"
                    });
                }
                else {
                    req.body.user = authData;
                    next();
                }
            }));
        }
        else {
            res.status(403).json({
                message: "Forbidden 2"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Forbidden"
        });
    }
};
module.exports = {
    verifyToken,
    verifyTokenMember
};
