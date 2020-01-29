import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class Soa_personal_salesServices {
  @Models("soa_personal_sales") model: any;

  constructor() {}
  async getPersonalSales(id: any, year: any, period: any) {
    const data = await this.model.find({
      MemberID: id,
      YearProcessed: year,
      Period: period
    });

    return data;
  }
}
