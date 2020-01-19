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
        
        <p><a href="http://localhost:3333/forgotPassword/validate/${result.data.payload.memberId}/${result.data.token}">http://localhost:3333/forgotPassword/validate/${result.data.payload.memberId}/${result.data.token}</p>
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

  // constructor(private services: SampleServices) {}

  // // This is a GET request equal to "/sample"
  // @Get({ path: "/", middlewares: [] })
  // get(req: Request, res: Response, next: NextFunction): void {
  //   // Use a function on SampleService
  //   this.services.getSamples();

  //   // Do some GET stuff here
  //   res.send("This is a GET request");
  // }

  // // This is a GET request equal to "/sample/:id"
  // @Get({ path: "/:id", middlewares: [] })
  // getId(req: Request, res: Response, next: NextFunction): void {
  //   // Do some GET stuff here
  //   res.send("This is a GET with id request");
  // }

  // // This is a POST request equal to "/sample/:id/:name"
  // @Post({ path: "/:id/:name", middlewares: [] })
  // post(req: Request, res: Response, next: NextFunction): void {
  //   // Do some POST stuff here
  //   res.send("This is a POST request");
  // }

  // // This is a PATCH request equal to "/sample/:id/custom-path"
  // @Patch({ path: "/:id/custom-path", middlewares: [] })
  // patch(req: Request, res: Response, next: NextFunction): void {
  //   // Do some PATCH stuff here
  //   res.send("This is a PATCH request");
  // }

  // // This is a PUT request equal to "/sample/:id"
  // @Put({ path: "/:id", middlewares: [] })
  // put(req: Request, res: Response, next: NextFunction): void {
  //   // Do some PUT stuff here
  //   res.send("This is a PUT request");
  // }

  // // This is a DELETE request equal to "/sample/:id"
  // @Delete({ path: "/:id", middlewares: [] })
  // delete(req: Request, res: Response, next: NextFunction): void {
  //   // Do some DELETE stuff here
  //   res.send("This is a DELETE request");
  // }
}
