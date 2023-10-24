import axios from "axios";

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
        async getProducts() {
            gMethods.loading = true 
            let products = await axios
                .get(`${gMethods.config.domain}/product`)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                }) 
            return products
        }
    },
    goto(url) {
        document.location.href = url

    },
    users: {
        disconnect() {
            localStorage.removeItem('jwtToken');
        },
        getProfileConnected() {
            if (localStorage.getItem('jwtToken')) {
                let token
                try {
                    token = JSON.parse(localStorage.getItem('jwtToken'));
                } catch (error) {
                    localStorage.removeItem('jwtToken');
                    return null
                }
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
