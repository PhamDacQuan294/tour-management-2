import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/tour.controller";

router.get("/", controller.index);

router.get("/list-tours", controller.listTours);

export const tourRoutes: Router = router;