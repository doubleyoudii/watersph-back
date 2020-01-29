import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

@Controller({
  model: "./soa_diamondmine.model",
  route: "/soa_diamondmine",
})
export class Soa_diamondmineController {

  constructor() {}
  
}