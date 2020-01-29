import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class Soa_goldmineServices {
  @Models("soa_goldmine") model: any;

  constructor() {}
  async getGoldmine(id: any, year: any, period: any) {
    const data = await this.model.find({
      MemberID: id,
      Yearprocessed: year,
      period: period
    });
    return data;
  }
}
