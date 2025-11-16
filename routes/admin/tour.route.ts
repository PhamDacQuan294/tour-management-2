import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/tour.controller";

const upload = multer();

router.get("/", controller.index);

router.get("/list-tours", controller.listTours);

router.patch("/delete/:id", controller.deleteTour);

router.get("/create", controller.create);

router.post(
  "/create", 
  upload.fields([
    { name: 'images', maxCount: 10 }
  ]),
  controller.createPost
);

export const tourRoutes: Router = router;