import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class Soa_summary_incomeServices {
  @Models("soa_summary_income") model: any;
  constructor() {}

  async getSummary(id: any, year: any, period: any) {
    const data = await this.model.find({
      Memberid: id,
      YearProcessed: year,
      Period: period
    });

    return data;
  }
  async findID(id: any) {
    const data = await this.model.find({ Memberid: id });
    console.log(data);
    return data;
  }
}
