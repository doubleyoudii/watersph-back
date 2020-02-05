"use strict";
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mayajs/core");
const mongo_1 = require("@mayajs/mongo");
const app_routing_module_1 = require("./app.routing.module");
const dotenv_1 = require("dotenv");
dotenv_1.config();
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    core_1.App({
      cors: true,
      logs: "dev",
      port: process.env.PORT || 3333,
      database: mongo_1.Mongo({
        connectionString:
          process.env.MONGO_CONNECTION_URL || "your-connection-string-here",
        options: {
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        }
      }),
      routes: app_routing_module_1.routes
    })
  ],
  AppModule
);
exports.AppModule = AppModule;
