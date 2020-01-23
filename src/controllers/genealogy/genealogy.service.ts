import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
const _ = require("lodash");

@Injectable()
export class GenealogyServices {
  @Models("genealogy") model: any;
  constructor() {}

  async getFilter(userId: any) {
    const id = userId;
    try {
      /* function removeDuplicates(array: any) {
        let x: any = {};
        array.forEach(function(i: any) {
          if (!x[i]) {
            x[i] = true;
          }
        });
        return Object.keys(x);
      } */

      const partialFilter = await this.model.find({ MemberID: id });

      /*       console.log(typeof partialFilter);

      let dates: any = [];
      let period: any = [];
      // let data: any;
      //PickedFilter is rawfile picked
      const pickedFilter = partialFilter.map((el: any) => {
        
        const picked = _.pick(el, ["DateProcessed", "PERIODNO"]);
        return picked;

      });
      console.log(pickedFilter);

      pickedFilter.forEach((el: any) => {
        dates.push(el.DateProcessed);
        period.push(el.PERIODNO);
      });



      const filteredDate = removeDuplicates(dates);

      const filteredPeriod = removeDuplicates(period);

      var sortedStrings = filteredDate.sort(function(a: any, b: any) {
        var aComps = a.split("/");
        var bComps = b.split("/");
        var aDate = new Date(aComps[2], aComps[0], aComps[1]);
        var bDate = new Date(bComps[2], bComps[0], bComps[1]);
        return aDate.getTime() - bDate.getTime();
      }); */
      // console.log(sortedStrings);

      return {
        status: 200,
        message: "Genealogy Fetch by id",
        data: partialFilter,
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
