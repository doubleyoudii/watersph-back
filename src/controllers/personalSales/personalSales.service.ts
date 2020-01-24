import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
const _ = require("lodash");

@Injectable()
export class PersonalSalesServices {
  @Models("personalSales") model: any;
  constructor() {}

  async getFilter(userId: any) {
    const id = userId;
    try {
      const partialFilter = await this.model.find({ MemberID: id });

      return {
        status: 200,
        message: "Personal Sales Fetch by id",
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
    console.log(convertDate);
    console.log(parameter);
    try {
      const data = await this.model
        .find({
          MemberID: parameter.id,
          TRANSACTIONDATE: convertDate,
          Periodno: Number(parameter.period)
        })
        .sort({ TransactionNo: 1 });

      return {
        status: 200,
        message: "Fetch personal sales using filters",
        data: data,
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
