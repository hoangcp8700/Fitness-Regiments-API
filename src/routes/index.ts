import express from "express";

import OAuthRouter from "./OAuthRouter";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import CategoryRouter from "./CategoryRouter";

const routes = express();
routes.use(UserRouter);
routes.use(CategoryRouter);
// routes.use(SubCategoryRouter);
// routes.use(ShopRouter);
// routes.use(ShopUserRouter);
// routes.use(ProductRouter);
routes.use("/auth", AuthRouter);

export const routesOauth = routes.use("/auth", OAuthRouter);

export default routes;
