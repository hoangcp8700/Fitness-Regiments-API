import express, { Application, Request, Response } from "express";
import cors from "cors";
// import passport from "passport";

import { HttpCode } from "@constants/enum";
import passportConnect from "@/configs/passport";
import routes from "@/routes";
import { CONFIG } from "@/configs";
import MESSAGES from "@constants/messages";
import errorHandler from "@exceptions/ErrorHandler";

const createServer = (): express.Application => {
  const app: Application = express();
  app.use(express.urlencoded({ extended: true, limit: "30mb" }));
  app.use(cors(CONFIG.corsOptions));
  app.use(express.json());
  // app.use(passport.initialize()); // init passport on every route call
  // app.use(passport.session()); // allow passport to use "express-session"

  // route
  app.use("/api", routes);
  // app.use(routesOauth); // passport

  app.get("/", (_req, res) => res.send("Welcome to monozon ecommerce"));

  app.all("*", (req: Request, res: Response) => {
    errorHandler(HttpCode.NOT_FOUND, MESSAGES.ROUTER_NOT_EXIST)(req, res);
  });

  return app;
};

export const libConfig = () => {
  passportConnect();
};

export { createServer };
