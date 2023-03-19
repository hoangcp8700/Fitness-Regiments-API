import express, { Application } from "express";
import cors from "cors";
// import passport from "passport";

import { AppError } from "@exceptions/AppError";
import MESSAGES from "@constants/messages";
import { HttpCode } from "@constants/enum";
import passportConnect from "@/configs/passport";
import routes from "@/routes";
import { CONFIG } from "@/configs";

const createServer = (): express.Application => {
  const app: Application = express();
  app.use(express.urlencoded({ extended: true, limit: "30mb" }));
  app.use(cors(CONFIG.corsOptions));
  app.use(express.json());
  console.log("123");
  // app.use(passport.initialize()); // init passport on every route call
  // app.use(passport.session()); // allow passport to use "express-session"

  // route
  app.use("/api", routes);
  // app.use(routesOauth); // passport

  app.get("/", (_req, res) => res.send("Welcome to monozon ecommerce"));
  app.all("*", () => {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: MESSAGES.ROUTER_NOT_EXIST,
    });
  });
  return app;
};

export const libConfig = () => {
  passportConnect();
};

export { createServer };
