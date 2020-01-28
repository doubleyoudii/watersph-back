import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { CutoffDatesServices } from "./cutoffDates.service";

@Controller({
  model: "./cutoffDates.model",
  route: "/cutoffDates"
})
export class CutoffDatesController {
  constructor(private services: CutoffDatesServices) {}

  @Get({ path: "/", middlewares: [] })
  async getDateTest(req: Request, res: Response, next: NextFunction) {
    const result = await this.services.getDateTest();
    res.status(result.status).send(result);
  }
}
