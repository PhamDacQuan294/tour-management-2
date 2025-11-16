import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helpers/generate";
import TourCategory from "../../models/tour-category.model";
import { systemConfig } from "../../config/system";

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
        deleted: true,
        deletedAt: new Date()
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

// [GET] /admin/tour/create
export const create = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      where: {
        deleted: false,
        status: "active"
      },
      raw: true
    });

    res.render("admin/pages/tours/create", {
      pageTitle: "Thêm mới tour",
      categories: categories
    });
  } catch (error) {
    console.log(error);
  }
}

// [POST] /admin/tour/create
export const createPost = async (req: Request, res: Response) => {
  try {
    const countTour = await Tour.count();
    const code = generateTourCode(countTour + 1);

    if (req.body.position === "") {
      req.body.position = countTour + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }

    const dataTour = {
      title: req.body.title,
      code: code,
      images: JSON.stringify(req.body.images),
      price: parseInt(req.body.price),
      discount: parseInt(req.body.discount),
      stock: parseInt(req.body.stock),
      timeStart: req.body.timeStart,
      position: req.body.position,
      status: req.body.status,
      information: req.body.information,
      schedule: req.body.schedule
    };

    const tour = await Tour.create(dataTour);
    const tourId = tour["id"];

    const dataTourCategory = {
      tour_id: tourId,
      category_id: parseInt(req.body.category_id)
    };

    await TourCategory.create(dataTourCategory);

    (req as any).flash("success", "Cập nhật trạng thái thành công!");
    
    res.redirect(`/${systemConfig.prefixAdmin}/tours`);
  } catch (error) {
    console.log(error); 
  }
}