import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { AdminServices } from "./admin.service";
const jwt = require("jsonwebtoken");

@Controller({
  model: "./admin.model",
  route: "/admin"
})
export class AdminController {
  constructor(private services: AdminServices) {}

  @Get({
    path: "/",
    middlewares: []
  })
  get(req: Request, res: Response, next: NextFunction): any {
    res.json({ message: "Welcome to Admin page" });
  }

  @Post({ path: "/createAdmin", middlewares: [] })
  async postCreate(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.createAdmin(req.body);
    console.log(result);

    res.status(result.status).send(result);
  }

  @Post({ path: "/login", middlewares: [] })
  async postLogin(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.loginAdmin(req.body);

    if (result.status !== 200) {
      res.status(result.status).send(result);
      return;
    }
    await jwt.sign(
      result.data,
      "saltadminlogin",
      { expiresIn: "1h" },
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

  @Get({ path: "/registrationList", middlewares: [] })
  async getList(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.getList();
    res.status(result.status).send(result);
  }
}
