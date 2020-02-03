import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { PersonalSalesServices } from "./personalSales.service";

const { verifyTokenMember } = require("../../middleware/index");

const _ = require("lodash");

@Controller({
  model: "./personalSales.model",
  route: "/personalSales"
})
export class PersonalSalesController {
  constructor(private services: PersonalSalesServices) {}

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

    //To Be change
    const userId = "QCY214337";
    const result = await this.services.getFilter(userId);

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
      // var aComps = a.split("/");
      // var bComps = b.split("/");
      // var aDate = new Date(aComps[2], aComps[0], aComps[1]);
      // var bDate = new Date(bComps[2], bComps[0], bComps[1]);
      // return aDate.getTime() - bDate.getTime();
      return a - b;
    });

    res.status(result.status).json({
      message: result.message,
      filter: {
        dateInterval: sortedStrings,
        periodInterval: filteredPeriod
      }
    });
  }

  @Get({ path: "/specific/:date/:period", middlewares: [verifyTokenMember] })
  async getData(req: Request, res: Response, next: NextFunction) {
    //To be Change
    const userId = "QCY214337";
    const params = {
      id: userId,
      date: req.params.date,
      period: req.params.period
    };
    const result = await this.services.getData(params);
    res.status(result.status).send(result);
  }
}
