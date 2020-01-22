import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// function verifyToken(req: Request, res: Response, next: NextFunction) {
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    //Do something in Token
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader!.split(" ");
      const bearerToken = bearer[1];
      req.body.token = bearerToken;

      jwt.verify(
        req.body.token,
        "testsecret",
        async (err: any, authData: any) => {
          if (err) {
            console.log(err);
            res.status(403).json({
              message: "Forbidden"
            });
          } else {
            req.body.user = authData;
            next();
          }
        }
      );
    } else {
      res.status(403).json({
        message: "Forbidden 2"
      });
    }
  } catch (error) {
    res.status(403).json({
      message: "Forbidden"
    });
  }
};

const verifyTokenMember = (req: Request, res: Response, next: NextFunction) => {
  try {
    //Do something in Token
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader!.split(" ");
      const bearerToken = bearer[1];
      req.body.token = bearerToken;

      jwt.verify(
        req.body.token,
        "saltregisterlogin",
        async (err: any, authData: any) => {
          if (err) {
            console.log(err);
            res.status(403).json({
              message: "Forbidden"
            });
          } else {
            req.body.user = authData;
            next();
          }
        }
      );
    } else {
      res.status(403).json({
        message: "Forbidden 2"
      });
    }
  } catch (error) {
    res.status(403).json({
      message: "Forbidden"
    });
  }
};

module.exports = {
  verifyToken,
  verifyTokenMember
  // authenticate,
  // authenticateActivate,
  // authenticateLogin,
  // authenticateUpload
};
//This will be add in every place you want to use this
//const verify = require("../../middleware/verifyJWT");
