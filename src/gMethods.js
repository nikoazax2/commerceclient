import axios from "axios";
import { gVariables } from "./gVariables";

// --------- Methodes gloables ---------
export const gMethods = {
  products: {
    createProduct() {
      let body = {
        name: "From front",
        prix: 9,
      };
      axios
        .post(`${gVariables.config.domain}/product`, body)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products data:", error);
        });
    },
  },
};
