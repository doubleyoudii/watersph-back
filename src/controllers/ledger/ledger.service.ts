import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class LedgerServices {
  @Models("ledger") model: any;
  constructor() {}
}
