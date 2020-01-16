import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class GenealogyServices {
  @Models("genealogy") model: any;
  constructor() {}
}
