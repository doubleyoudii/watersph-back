import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { GroupSalesServices } from "./groupSales.service";
const { verifyTokenMember } = require("../../middleware/index");

@Controller({
  model: "./groupSales.model",
  route: "/groupSales"
})
export class GroupSalesController {
  constructor(private services: GroupSalesServices) {}

  @Get({ path: "/", middlewares: [verifyTokenMember] })
  async getDates(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.getDates();
    res.status(result.status).send(result);
  }

  @Get({ path: "/specific/:datefrom", middlewares: [verifyTokenMember] })
  async getSales(req: Request, res: Response, next: NextFunction) {
    const reqData = {
      //to be change MemberId from middleware
      id: req.body.user.memberId,
      datefrom: req.params.datefrom
    };
    const result = await this.services.getSales(reqData);

    res.status(result.status).send(result);
  }
}
