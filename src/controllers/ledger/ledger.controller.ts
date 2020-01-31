import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { LedgerServices } from "./ledger.service";
const { verifyTokenMember } = require("../../middleware/index");

@Controller({
  model: "./ledger.model",
  route: "/ledger"
})
export class LedgerController {
  constructor(private services: LedgerServices) {}

  @Get({ path: "/", middlewares: [verifyTokenMember] })
  async getFilter(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.getFilter();
    res.status(result.status).send(result);
  }

  @Get({ path: "/specific/:year/:period", middlewares: [verifyTokenMember] })
  async getSoa(req: Request, res: Response, next: NextFunction) {
    const id = "QC9500073";
    const request = {
      id: id,
      year: Number(req.params.year),
      period: Number(req.params.period)
    };
    const result = await this.services.getSoa(request);
    res.status(result.status).send(result);
  }
}
