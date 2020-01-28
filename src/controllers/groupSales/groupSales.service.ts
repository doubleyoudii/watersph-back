import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { CutoffDatesServices } from "../cutoffDates/cutoffDates.service";

const _ = require("lodash");

@Injectable()
export class GroupSalesServices {
  @Models("groupSales") model: any;
  constructor(private cutoff: CutoffDatesServices) {}

  async getDates() {
    try {
      const dateList = await this.cutoff.passDate();

      return {
        status: 200,
        message: "Dates fetch",
        data: dateList,
        meta: {}
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }
}
