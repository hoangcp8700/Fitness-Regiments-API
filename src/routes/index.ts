import express from "express";

// import OAuth from "@/services/OAuth";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";

const routes = express();
routes.use(UserRouter);
// routes.use(CategoryRouter);
// routes.use(SubCategoryRouter);
// routes.use(ShopRouter);
// routes.use(ShopUserRouter);
// routes.use(ProductRouter);
routes.use("/auth", AuthRouter);

// export const routesOauth = routes.use("/auth", OAuth);

export default routes;
