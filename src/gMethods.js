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
    users: {
        createUser(name, adress, email, password) {
            let body = {
                name: name,
                adress: adress,
                email: email,
                password: password,
            };
            axios
                .post(`${gVariables.config.domain}/user`, body)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                });
        },
        getProfile() {
            const headers = {
                Authorization: `Bearer ${gVariables.config.token}`,
            };
            axios
                .get(`${gVariables.config.domain}/auth/profile`, { headers })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                });
        },
        login(name, password) {
            let body = {
                username: name,
                password: password,
            }

            axios
                .post(`${gVariables.config.domain}/auth/login`, body)
                .then((response) => {
                    console.log(response.data)
                    gVariables.config.token = response.data.access_token
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                });
        },
    }
};
