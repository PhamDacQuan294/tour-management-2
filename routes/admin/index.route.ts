import { Express } from "express";
import { systemConfig } from "../../config/system";
import { tourRoutes } from "./tour.route";

const adminRoutes = (app: Express): void => {

  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use(`${PATH_ADMIN}/tours`, tourRoutes);
};

export default adminRoutes;

