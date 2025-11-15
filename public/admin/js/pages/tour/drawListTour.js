import { get } from "../../utils/request.js";
import { listTour } from "./variable.js";

export const drawListTour = async () => {
  const data = await get("/admin/tours/list-tours");

  let htmlsArray = data.tours.map((item, index) => {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            width="100px"
            height="auto"
          />
        </td>
        <td>${item.title}</td>
        <td>${item.price.toLocaleString()}đ</td>
        <td>${item.discount}%</td>
        <td>${item.price_special.toLocaleString()}đ</td>
        <td>${item.stock}</td>
        <td>
          ${item.status === "active" 
            ? `<a href="javascript:;" class="badge badge-success">Hoạt động</a>`
            : `<a href="javascript:;" class="badge badge-danger">Dừng hoạt động</a>`
          }
        </td>
        <td>${item.position}</td>
        <td>
          <a class="btn btn-secondary btn-sm">Chi tiết</a>
          <a class="btn btn-warning btn-sm ml-1">Sửa</a>
          <button 
            class="btn btn-danger btn-sm ml-1"
            button-delete
            data-id="${item.id}"
          >Xóa</button>
        </td>
      </tr>
    `;
  });

  listTour.innerHTML = htmlsArray.join("");
};


