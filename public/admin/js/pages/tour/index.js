import { patch } from "../../utils/request.js";
import { drawListTour } from "./drawListTour.js";

const deleteTour = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]"); 

  listBtnDelete.forEach((button) => {
    button.addEventListener("click", async () => {
      const tourId = button.getAttribute("btn-delete");

      const response = await patch(`/admin/tours/delete/${tourId}`);

      if (response.code == 200) {
        init();
      }
    });
  });
};

const init = async () => {
  await drawListTour(); 
  deleteTour();         
};

init();
