import express from "express";

import OAuthRouter from "./OAuthRouter";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import CategoryRouter from "./CategoryRouter";
import ExerciseRouter from "./ExerciseRouter";
import AdsRouter from "./AdsRouter";
import WorkoutRegimentRouter from "./WorkoutRegimentRouter";
import WorkoutRegimentItemRouter from "./WorkoutRegimentItemRouter";

const routes = express();
routes.use(UserRouter);
routes.use(CategoryRouter);
routes.use(ExerciseRouter);
routes.use(AdsRouter);
routes.use(WorkoutRegimentRouter);
routes.use(WorkoutRegimentItemRouter);

// routes.use(SubCategoryRouter);
// routes.use(ShopRouter);
// routes.use(ShopUserRouter);
// routes.use(ProductRouter);
routes.use("/auth", AuthRouter);

export const routesOauth = routes.use("/auth", OAuthRouter);

export default routes;
