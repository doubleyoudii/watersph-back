import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { resolve } from "dns";
const _ = require("lodash");

@Injectable()
export class GenealogyServices {
  @Models("genealogy") model: any;
  constructor() {}

  async getFilter(userId: any) {
    const id = userId;
    try {
      const partialFilter = await this.model.find({ MemberID: id });

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

  async postFilter(body: any) {
    const data = _.pick(body, ["user", "date", "period"]);
    console.log(data);
    //To Be changed
    const userId = "QCY214337";
    try {
      const geneData = await this.model
        .find({
          // MemberID: data.user.memberId,
          MemberID: userId,
          DateProcessed: data.date,
          PERIODNO: data.period
        })
        .sort({ LevelPosition: 1 });
      // console.log(geneData);

      return {
        status: 200,
        mesage: "Fetch genealogy using filters successful",
        data: geneData,
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
