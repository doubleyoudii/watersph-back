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

  async getData(params: any) {
    const parameter = params;
    const rawDate = parameter.date;
    const convertDate = rawDate.split("-").join("/");

    try {
      const geneData = await this.model
        .find({
          // MemberID: data.user.memberId,
          MemberID: parameter.id,
          DateProcessed: convertDate,
          PERIODNO: Number(parameter.period),
          Status: "ACTIVE"
        })

        .sort({ LevelPosition: 1 });

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
