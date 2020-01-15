import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class SampleServices {
  constructor() {}

  hello() {
    return "Hello world!";
  }
}
