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
      const salt: any = process.env.JWT_SALT_ADMIN;

      jwt.verify(
        req.body.token,
        // "testsecret",
        salt,
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
      const salt: any = process.env.JWT_SALT_MEMBER;

      jwt.verify(req.body.token, salt, async (err: any, authData: any) => {
        if (err) {
          console.log(err);
          res.status(403).json({
            message: "Forbidden"
          });
        } else {
          req.body.user = authData;
          next();
        }
      });
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
};
