import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { LedgerServices } from "./ledger.service";
const { verifyTokenMember } = require("../../middleware/index");

const _ = require("lodash");

@Controller({
  model: "./ledger.model",
  route: "/ledger"
})
export class LedgerController {
  constructor(private services: LedgerServices) {}

  @Get({ path: "/", middlewares: [verifyTokenMember] })
  async getFilter(req: Request, res: Response, next: NextFunction) {
    function removeDuplicates(array: any) {
      let x: any = {};
      array.forEach(function(i: any) {
        if (!x[i]) {
          x[i] = true;
        }
      });
      return Object.keys(x);
    }

    const userId = req.body.user.memberId;
    const result = await this.services.getFilter(userId);

    let dates: any = [];
    let period: any = [];
    const resultData = result.data;
    let partialFilter: any = JSON.stringify(result.data);
    let b2bfilter = JSON.parse(partialFilter);

    //PickedFilter is rawfile picked
    const pickedFilter = b2bfilter.map((el: any) => {
      const picked = _.pick(el, ["YearProcessed", "Period"]);
      return picked;
    });

    pickedFilter.forEach((el: any) => {
      dates.push(el.YearProcessed);
      period.push(el.Period);
    });

    const filteredDate = removeDuplicates(dates);

    const filteredPeriod = removeDuplicates(period);

    var sortedStrings = filteredDate.sort(function(a: any, b: any) {
      return a - b;
    });

    res.status(result.status).json({
      message: result.message,
      data: {
        year: sortedStrings,
        period: filteredPeriod
      }
    });
  }

  @Get({ path: "/specific/:year/:period", middlewares: [verifyTokenMember] })
  async getSoa(req: Request, res: Response, next: NextFunction) {
    const id = req.body.user.memberId;
    const request = {
      id: id,
      year: Number(req.params.year),
      period: Number(req.params.period)
    };
    const result = await this.services.getSoa(request);
    res.status(result.status).send(result);
  }
}
