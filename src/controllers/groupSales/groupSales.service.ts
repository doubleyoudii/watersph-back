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

  async getSales(requests: any) {
    const parameter = requests;
    const rawDateFrom = parameter.datefrom;

    console.log(rawDateFrom);

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
      //dateFrom (slice1stParam)
      const convertedDateFrom = rawDateFrom.split("-").join("/");

      const dateList = await this.cutoff.passDate();
      const fromDate = dateList.dateFrom;

      const index = fromDate.indexOf(convertedDateFrom);

      if (index === -1) {
        return {
          status: 200,
          message: "Invalid Date. Please Try other Dates!",
          data: [],
          meta: {}
        };
      }

      const toDates = dateList.dateTo;
      //dateTo (slice2ndParam)
      const toDate = toDates[index];

      //Date compilation
      let listDates: any = [];

      //query this model (groupSales)
      const groupListAll = await this.model
        .find({ MemberID: parameter.id })
        .sort({ LevelPosition: 1 });

      const partialGroup = JSON.stringify(groupListAll);
      const b2bFilter = JSON.parse(partialGroup);

      //this contains objects in array
      const pickedDates = b2bFilter.map((el: any) => {
        return el;
      });

      pickedDates.forEach((el: any) => {
        listDates.push(el.TransactionDate);
      });

      listDates.push(convertedDateFrom);
      listDates.push(toDate);

      const fnalDateLists = removeDuplicates(listDates);

      //this contains all valid dates in order
      const sortedFnalDateLists: any = fnalDateLists.sort(function(
        a: any,
        b: any
      ) {
        var aComps = a.split("/");
        var bComps = b.split("/");
        var aDate = new Date(aComps[2], aComps[0], aComps[1]);
        var bDate = new Date(bComps[2], bComps[0], bComps[1]);
        return aDate.getTime() - bDate.getTime();
      });

      const index1st = sortedFnalDateLists.indexOf(convertedDateFrom);
      console.log(index1st);
      const index2nd = sortedFnalDateLists.indexOf(toDate);
      console.log(index2nd);

      const slicedSortedDates = sortedFnalDateLists.slice(
        index1st,
        index2nd + 1
      );

      const fnalGroupSales: any = [];

      pickedDates.forEach((el: any) => {
        if (slicedSortedDates.includes(el.TransactionDate)) {
          fnalGroupSales.push(el);
        }
      });

      return {
        status: 200,
        message: "Fetch Group Sales based on Date From",
        data: fnalGroupSales,
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
