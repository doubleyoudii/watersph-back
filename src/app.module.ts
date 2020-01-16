import { App } from "@mayajs/core";
import { Mongo } from "@mayajs/mongo";
import { routes } from "./app.routing.module";
import { config } from "dotenv";
config();
@App({
  cors: true,
  logs: "dev",
  port: 3333,
  database: Mongo({
    connectionString:
      process.env.MONGO_CONNECTION_URL || "your-connection-string-here",
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  }),
  routes
})
export class AppModule {}
