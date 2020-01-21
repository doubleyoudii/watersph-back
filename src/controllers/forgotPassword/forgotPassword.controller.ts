import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { ForgotPasswordServices } from "./forgotPassword.service";
const nodemailer = require("nodemailer");

@Controller({
  model: "./forgotPassword.model",
  route: "/forgotPassword"
})
export class ForgotPasswordController {
  constructor(private services: ForgotPasswordServices) {}

  @Get({
    path: "/",
    middlewares: []
  })
  get(req: Request, res: Response, next: NextFunction): any {
    res.json({ message: "Welcome to Forgot password page" });
  }

  @Post({ path: "/", middlewares: [] })
  async post(req: Request, res: Response, next: NextFunction) {
    const result: any = await this.services.findUser(req.body);
    res.status(result.status).send(result);

    if (result.status === 200) {
      const mailContent = `
      <h4>This is the Confirmation link for Forgot Password!</h4>
      <p>Note: This is only a one time confirmation link. If there's a problem occur during the proccess, please send another Link. This Link will expire after 1hr, Thank you</p>
      <div>
        
        <p><a href="http://127.0.0.1:4200/change-password/${result.data.payload.memberId}/${result.data.token}">http://localhost:3333/forgotPassword/validate/${result.data.payload.memberId}/${result.data.token} **Proceed to Changing of Password**</p>
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
          subject: "Forgot Password Verification", // Subject line
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

    const result: any = await this.services.getCredentials(req.params);

    // Do some GET stuff here
    res.status(result.status).json(result);
  }

  @Post({ path: "/changePassword", middlewares: [] })
  async postChange(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.changePassword(req.body);
    console.log(result);
    res.status(result.status).send(result);
  }
}
