import axios from "axios";
import { contenu } from "./contenu";
import { myCustomLightTheme } from "./plugins/vuetify";
// --------- Methodes gloables ---------
export const gMethods = {
    config: {
        domain: "http://localhost:3000",
        token: null,
    },
    loading: true,
    userConnected: null,
    isPhone: false,
    iframeImg: {
        show: false,
        url: null
    },
    recherche: '',
    goto(url, newTab = false) {
        if (newTab) {
            window.open(url, '_blank');
        } else {
            document.location.href = url
        }

    },
    breadcrumbsUrl(item) {
        this.goto(item.url)
    },
    getColorTheme(color) {
        return myCustomLightTheme.colors[color]
    },

    // --------- Methodes pour les produits ---------
    categories: [],
    products: [],
    createProduct(product) {
        axios
            .post(`${this.config.domain}/product`, product)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    async getCategories() {
        this.loading = true
        let categories = await axios
            .get(`${this.config.domain}/categorie`)
            .then((response) => {
                this.loading = false
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
        return categories
    },
    async getProducts() {
        this.loading = true
        let products = await axios
            .get(`${this.config.domain}/product`)
            .then((response) => {
                this.loading = false
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
        return products
    },
    async deleteProduct(uuid) {
        this.loading = true
        await axios
            .delete(`${this.config.domain}/product/${uuid}`)
            .then((response) => {
                this.loading = false
                document.location.reload()
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    async editProduct(product) { 
        this.loading = true
        await axios
            .patch(`${this.config.domain}/product/${product.uuid}`, product)
            .then(async (response) => {

                this.loading = false
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })

        if (product.variations) product.variations.forEach(async (variation) => {
            if (variation.uuid) {
                await axios
                    .patch(`${this.config.domain}/variation/${variation.uuid}`, variation)
                    .then((response) => {
                        this.loading = false
                        return response.data
                    })
                    .catch((error) => {
                        console.error("Error fetching products data:", error);
                    })
            }
            else {
                await axios
                    .post(`${this.config.domain}/variation`, variation)
                    .then((response) => {
                        this.loading = false
                        return response.data
                    })
                    .catch((error) => {
                        console.error("Error fetching products data:", error);
                    })
            }
        }
        )
        document.location.reload()


    },
    formatPrix(prix, devise = false) {
        return prix.toFixed(2).toString().replace('.', ',') + (devise ? ' €' : '')
    },

    // --------- Methodes pour les commandes ---------
    menuCart: false,
    cart: null,
    productsOfCart(cart, products) {
        let cartDetails = []
        cart.forEach((productCart) => {
            products.forEach((product) => {
                if (productCart.product == product.uuid) {
                    cartDetails.push({ ...product, ...productCart })
                }
            })
        })
        return cartDetails
    },
    addInCart(product, user, quantity = 1) {
        this.loading = true
        if (user) {
            let cart = {
                user: this.userConnected.uuid,
                product: product,
                quantity: quantity
            }
            axios
                .post(`${this.config.domain}/cart`, cart)
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
            this.cart.cart = cart
            localStorage.setItem(this.nameInCookie(), JSON.stringify(cart))
            //set scroll of html at 0
            document.documentElement.scrollTop = 0

            this.loading = false
        }
    },
    deleteInCart(product, user) {
        this.loading = true
        if (user) {
            axios
                .delete(`${this.config.domain}/cart/${product.uuid}`)
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
                    cart.splice(index, 1)
                }
            }
            this.cart.cart = cart
            localStorage.setItem(this.nameInCookie(), JSON.stringify(cart))
            this.loading = false
        }
    },
    nameInCookie() {
        return `${contenu.general.nom.replaceAll(' ', '-').toLocaleLowerCase()}-cart`
    },
    getCart(connected = false) {
        if (connected) {
            axios
                .get(`${this.config.domain}/cart`)
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

    },

    // --------- Methodes pour les utilisateurs --------- 
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
            .post(`${this.config.domain}/user`, body)
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
                    .get(`${this.config.domain}/auth/profile`, { headers })
                    .then((response) => {
                        if (userConnected) this.userConnected = response.data

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
            .post(`${this.config.domain}/auth/login`, body)
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

    // --------- Methodes pour les catégories ---------
    createCategorie(categorie) {
        this.loading = true
        axios
            .post(`${this.config.domain}/categorie`, categorie)
            .then((response) => {
                console.log(response.data);
                this.loading = false
                document.location.reload()
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    async deleteCategorie(uuid) {
        this.loading = true
        await axios
            .delete(`${this.config.domain}/categorie/${uuid}`)
            .then((response) => {
                this.loading = false
                document.location.reload()
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    async editCategorie(categorie) {
        this.loading = true
        await axios
            .patch(`${this.config.domain}/categorie/${categorie.uuid}`, categorie)
            .then((response) => {
                this.loading = false
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
        document.location.reload()
    },
};
