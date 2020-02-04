import { Get, Patch, Post, Delete, Put, Check } from "@mayajs/common";
import { Request, Response, NextFunction, json } from "express";
import { Controller } from "@mayajs/core";
import { RegisterServices } from "./register.service";
// import { config } from "dotenv";
// config();
const _ = require("lodash");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { verifyTokenMember } = require("../../middleware/index");

@Controller({
  model: "./register.model",
  route: "/register"
})
export class RegisterController {
  constructor(private services: RegisterServices) {}

  @Get({
    path: "/",
    middlewares: [verifyTokenMember]
  })
  get(req: Request, res: Response, next: NextFunction): any {
    console.log(process.env.USER_PASS);
    res.json({ message: "Welcome to register page" });
  }

  @Post({
    path: "/",
    middlewares: [
      Check("email")
        .isEmail()
        .required(),
      Check("memberId")
        .isString()
        .required()
    ]
  })
  async post(
    req: Request,
    res: Response,
    next: NextFunction
  ) /* : Promise<void> */ {
    const result: any = await this.services.verifyMemberId(req.body);
    res.status(result.status).send(result);

    if (result.status === 200) {
      const mailContent = `
      <h4>This is the Confirmation link for Verifying the Registration</h4>
      <p>Note: This is only a one time confirmation link. If there's a problem occur during the proccess, please send another Link. This Link will expire after 1hr, Thank you</p>
      <div>
        

        <p><a href="http://127.0.0.1:4200/signup/${result.data.payload.memberId}/${result.data.token}">http://localhost:3333/register/validate/${result.data.payload.memberId}/${result.data.token}</p>
      </div>
    `;

      async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.mail.yahoo.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.USER_EMAIL, // generated ethereal user
            pass: process.env.USER_PASS // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"William of Techcellar 👻" <${process.env.USER_EMAIL}>`, // sender address
          to: `${result.data.payload.email}`, // list of receivers
          subject: "Email Verification", // Subject line
          text: "Read Me!", // plain text body
          html: mailContent // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      }

      main().catch(console.error);
    }
  }

  @Get({ path: "/validate/:memberId/:token", middlewares: [] })
  async getCredentials(req: Request, res: Response, next: NextFunction) {
    // Use a function on SampleService

    const result = await this.services.getCredentials(req.params);

    // Do some GET stuff here
    res.status(result.status).json(result);
  }

  @Post({ path: "/signup", middlewares: [] })
  async postForm(req: Request, res: Response, next: NextFunction) {
    // Do some POST stuff here
    const result = await this.services.postForm(req.body);
    res.status(result.status).send(result);
  }

  @Post({ path: "/login", middlewares: [] })
  async postLogin(req: Request, res: Response, next: NextFunction) {
    const result: any = await this.services.postLogin(req.body);
    const salt: any = process.env.JWT_SALT_MEMBER;
    // console.log(salt);

    //Sign token   secket key must be hidden
    if (result.status !== 200) {
      res.status(result.status).send(result);
      return;
    }
    await jwt.sign(
      result.data,
      salt,
      { expiresIn: "7h" },
      (e: any, token: string) => {
        res
          .status(result.status)
          .header("authorization", token)
          .json({
            success: true,
            token: "Bearer " + token
          });
      }
    );
  }

  @Get({ path: "/login/me", middlewares: [verifyTokenMember] })
  async getMe(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.user.memberId;
    const result = await this.services.getMe(userId);
    res.status(result.status).send(result);
  }

  @Post({ path: "/login/me/edit", middlewares: [verifyTokenMember] })
  async postEditReg(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.user.memberId;
    const result = await this.services.postEditReg(userId, req.body);
    res.status(result.status).send(result);
  }
}
