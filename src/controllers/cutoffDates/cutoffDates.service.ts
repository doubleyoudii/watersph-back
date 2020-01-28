import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

const _ = require("lodash");

@Injectable()
export class CutoffDatesServices {
  @Models("cutoffDates") model: any;
  constructor() {}

  async getDateTest() {
    try {
      const dates = await this.model.find();
      return {
        status: 200,
        message: "Test Dates",
        data: dates,
        meta: {}
      };
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }

  async passDate() {
    const data = await this.model.find();
    let partialFilter: any = JSON.stringify(data);
    let b2bfilter = JSON.parse(partialFilter);

    let dateFrom: any = [];
    let dateTo: any = [];

    const pickedFilter = b2bfilter.map((el: any) => {
      const picked = _.pick(el, ["DateFrom", "DateTo", "PeriodNo"]);
      return picked;
    });

    pickedFilter.forEach((el: any) => {
      dateFrom.push(el.DateFrom);
      dateTo.push(el.DateTo);
    });

    let sortedDateFrom = dateFrom.sort(function(a: any, b: any) {
      var aComps = a.split("/");
      var bComps = b.split("/");
      var aDate = new Date(aComps[2], aComps[0], aComps[1]);
      var bDate = new Date(bComps[2], bComps[0], bComps[1]);
      return aDate.getTime() - bDate.getTime();
    });

    let sortedDateTo = dateTo.sort(function(a: any, b: any) {
      var aComps = a.split("/");
      var bComps = b.split("/");
      var aDate = new Date(aComps[2], aComps[0], aComps[1]);
      var bDate = new Date(bComps[2], bComps[0], bComps[1]);
      return aDate.getTime() - bDate.getTime();
    });

    return {
      dateFrom: sortedDateFrom,
      dateTo: sortedDateTo
    };
  }
}
