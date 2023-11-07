import axios from "axios";
import { contenu } from "./contenu";
// --------- Methodes gloables ---------
export const gMethods = {
    config: {
        domain: "http://localhost:3000",
        token: null,
    },
    loading: false,
    userConnected: null,
    isPhone: false,

    products: {
        categories: [],
        products: [],
        createProduct(product) {
            axios
                .post(`${gMethods.config.domain}/product`, product)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                })
        },
        async getCategories() {
            gMethods.loading = true
            let categories = await axios
                .get(`${gMethods.config.domain}/categorie`)
                .then((response) => {
                    gMethods.loading = false
                    return response.data
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                })
            return categories
        },
        async getProducts() {
            gMethods.loading = true
            let products = await axios
                .get(`${gMethods.config.domain}/product`)
                .then((response) => {
                    gMethods.loading = false
                    return response.data
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                })
            return products
        },
        async deleteProduct(uuid) {
            gMethods.loading = true
            await axios
                .delete(`${gMethods.config.domain}/product/${uuid}`)
                .then((response) => {
                    gMethods.loading = false
                    document.location.reload()
                    return response.data
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                })
        },
        async editProduct(product) {
            gMethods.loading = true
            await axios
                .patch(`${gMethods.config.domain}/product/${product.uuid}`, product)
                .then(async (response) => {
                    document.location.reload()
                    gMethods.loading = false
                    return response.data
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                })

        },
        formatPrix(prix) {
            return prix.toFixed(2).toString().replace('.', ',')
        }
    },
    goto(url) {
        document.location.href = url

    }, 
    cart: {
        menuCart:false,
        cart: null,
        addInCart(product, user, quantity = 1) {
            gMethods.loading = true
            if (user) {
                let cart = {
                    user: gMethods.userConnected.uuid,
                    product: product,
                    quantity: quantity
                }
                axios
                    .post(`${gMethods.config.domain}/cart`, cart)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching products data:", error);
                    })
            } else {
                let cart = JSON.parse(localStorage.getItem(this.nameInCookie()))
                if (cart) {
                    let index = cart.findIndex((item) => item.product === product.uuid)
                    if (index !== -1) {
                        cart[index].quantity += parseInt(quantity)
                    } else {
                        cart.push({
                            product: product.uuid,
                            quantity: quantity
                        })
                    }
                } else {
                    cart = [{
                        product: product.uuid,
                        quantity: quantity
                    }]
                }
                gMethods.cart.cart = cart
                localStorage.setItem(this.nameInCookie(), JSON.stringify(cart))
                gMethods.loading = false
            }
        },
        nameInCookie() {
            return `${contenu.general.nom.replaceAll(' ', '-').toLocaleLowerCase()}-cart`
        },
        getCart(connected = false) {
            if (connected) {
                axios
                    .get(`${gMethods.config.domain}/cart`)
                    .then((response) => {
                        this.cart = response.data
                        localStorage.setItem(this.nameInCookie(), JSON.stringify(cart))
                    })
                    .catch((error) => {
                        console.error("Error fetching products data:", error);
                    })
            } else {
                this.cart = JSON.parse(localStorage.getItem(this.nameInCookie()))
            }

        }
    },
    users: {
        disconnect() {
            localStorage.removeItem('jwtToken');
        },
        getProfileConnected() {
            if (localStorage.getItem('jwtToken')) {
                let jwtToken = localStorage.getItem('jwtToken')
                let token
                try {
                    token = JSON.parse(atob(jwtToken.split('.')[1]));
                } catch (error) {
                    localStorage.removeItem('jwtToken');
                    return null
                }
                token.access_token = JSON.parse(jwtToken).access_token
                if (!this.isTokenExpired(token.access_token)) {
                    return token
                } else {
                    localStorage.removeItem('jwtToken');
                    return null
                }
            } else {
                return null
            }
        },
        createUser(body) {
            axios
                .post(`${gMethods.config.domain}/user`, body)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.uuid) {
                        this.login(response.data.username, response.data.password)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                });
        },
        getProfile(userConnected = false) {
            this.loading = true
            const token = JSON.parse(localStorage.getItem('jwtToken'));
            if (token) {
                if (!this.isTokenExpired(token.access_token)) {
                    const headers = {
                        Authorization: `Bearer ${token.access_token}`,
                    }
                    axios
                        .get(`${gMethods.config.domain}/auth/profile`, { headers })
                        .then((response) => {
                            if (userConnected) this.userConnected = response.data
                            debugger
                            localStorage.setItem('jwtToken', JSON.stringify({ access_token: token.access_token, ...response.data }));
                            this.loading = false
                        })
                        .catch((error) => {
                            console.error("Error fetching products data:", error);
                        });
                } else {
                    document.location.href = '/user/login'
                    localStorage.removeItem('jwtToken');
                }
            } else {
                document.location.href = '/user/login'
            }
            this.loading = false
        },
        isTokenExpired(token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
            return expirationTime < Date.now();
        },
        login(name, password) {
            let body = {
                username: name,
                password: password,
            }

            axios
                .post(`${gMethods.config.domain}/auth/login`, body)
                .then((response) => {
                    console.log(response.data)
                    localStorage.setItem('jwtToken', JSON.stringify({ access_token: response.data.access_token }))
                    this.getProfile(true)
                    document.location.href = '/'
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                });
        },
    }
};
