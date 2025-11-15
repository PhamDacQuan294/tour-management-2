import { Request, Response } from "express";
import Tour from "../../models/tour.model";

// [GET] /admin/tours/
export const index = async (req: Request, res: Response) => {
  try {
    res.render("admin/pages/tours/index", {
      pageTitle: "Danh sách tour",
    })
  } catch (error) {
    console.log(error);
  }
}

// [GET] /admin/tours/list-tours
export const listTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.findAll({
      where: {
        deleted: false,
      },
      raw: true
    });

    tours.forEach((item) => {
      if(item["images"]) {
        const images = JSON.parse(item["images"]);
        item["image"] = images[0];
      }

      item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    });

    res.json({
      tours: tours
    })
  } catch (error) {
    console.log(error);
  }
}

// [PATCH] /admin/tours/delete/:id
export const deleteTour = async (req: Request, res: Response) => {
  try {
    const id: String = req.params.id;

    await Tour.update(
      {
        deleted: true
      },
      {
        where: {
          id: id
        }
      }
    );

    res.json({
      code: 200
    });

  } catch (error) {
    console.log(error);
  }
}
