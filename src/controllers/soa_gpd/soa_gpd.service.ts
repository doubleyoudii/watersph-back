import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class Soa_gpdServices {
  @Models("soa_gpd") model: any;

  constructor() {}
  async getGpd(id: any, year: any, period: any) {
    const data = await this.model.find({
      Memberid: id,
      YearProcessed: year,
      Period: period
    });

    return data;
  }
}
