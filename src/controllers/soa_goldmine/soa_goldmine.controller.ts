import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

@Controller({
  model: "./soa_goldmine.model",
  route: "/soa_goldmine",
})
export class Soa_goldmineController {

  constructor() {}
  
}