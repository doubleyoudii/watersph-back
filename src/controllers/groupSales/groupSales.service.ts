import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { CutoffDatesServices } from "../cutoffDates/cutoffDates.service";

const _ = require("lodash");

@Injectable()
export class GroupSalesServices {
  @Models("groupSales") model: any;
  constructor(private cutoff: CutoffDatesServices) {}

  async getDates(userId: any) {
    const id = userId;
    try {
      const partialFilter = await this.model.find({ MemberID: id });

      return {
        status: 200,
        message: "Personal Sales Fetch by id",
        data: partialFilter,
        meta: {}
      };

      // const dateList = await this.cutoff.passDate();

      // return {
      //   status: 200,
      //   message: "Dates fetch",
      //   data: dateList,
      //   meta: {}
      // };
    } catch (error) {
      return {
        status: 400,
        message: error.errmsg ? error.errmsg : error.toString(),
        data: [],
        meta: {}
      };
    }
  }

  async getGroup(requests: any) {
    const parameter = requests;
    const paramDate = Number(parameter.date);
    const paramPeriod = Number(parameter.period);
    function removeDuplicates(array: any) {
      let x: any = {};
      array.forEach(function(i: any) {
        if (!x[i]) {
          x[i] = true;
        }
      });
      return Object.keys(x);
    }

    try {
      const groupData = await this.model
        .find({
          MemberID: parameter.id,
          Yearprocessed: paramDate,
          Periodno: paramPeriod
        })
        .sort({ LevelPosition: 1 });

      return {
        status: 200,
        message: "Fetch Group Sales based on Date From",
        data: groupData,
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
}
