import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

import { ProfileServices } from "./profile.service";

const { verifyTokenMember } = require("../../middleware/index");

@Controller({
  model: "./profile.model",
  route: "/profile"
})
export class ProfileController {
  constructor(private services: ProfileServices) {}

  @Get({ path: "/me", middlewares: [verifyTokenMember] })
  async getMe(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.user.memberId;
    const result = await this.services.findMember(userId);

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
