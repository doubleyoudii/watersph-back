import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { GroupSalesServices } from "./groupSales.service";
const { verifyTokenMember } = require("../../middleware/index");
const _ = require("lodash");

@Controller({
  model: "./groupSales.model",
  route: "/groupSales"
})
export class GroupSalesController {
  constructor(private services: GroupSalesServices) {}

  @Get({ path: "/", middlewares: [verifyTokenMember] })
  async getDates(req: Request, res: Response, next: NextFunction) {
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
    const result = await this.services.getDates(userId);

    let dates: any = [];
    let period: any = [];
    const resultData = result.data;
    let partialFilter: any = JSON.stringify(result.data);
    let b2bfilter = JSON.parse(partialFilter);

    //PickedFilter is rawfile picked
    const pickedFilter = b2bfilter.map((el: any) => {
      const picked = _.pick(el, ["Yearprocessed", "Periodno"]);
      return picked;
    });

    pickedFilter.forEach((el: any) => {
      dates.push(el.Yearprocessed);
      period.push(el.Periodno);
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

  @Get({ path: "/specific/:date/:period", middlewares: [verifyTokenMember] })
  async getSales(req: Request, res: Response, next: NextFunction) {
    const reqData = {
      //to be change MemberId from middleware
      id: req.body.user.memberId,
      date: req.params.date,
      period: req.params.period
    };
    const result = await this.services.getGroup(reqData);

    res.status(result.status).send(result);
  }
}
