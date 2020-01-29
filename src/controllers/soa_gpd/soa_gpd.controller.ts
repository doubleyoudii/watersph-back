import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";

@Controller({
  model: "./soa_gpd.model",
  route: "/soa_gpd",
})
export class Soa_gpdController {

  constructor() {}
  
}