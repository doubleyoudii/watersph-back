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
}
