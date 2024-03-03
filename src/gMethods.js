import axios from "axios";
import { contenu } from "./contenu";
import { myCustomLightTheme } from "./plugins/vuetify";
import router from "./router";
// --------- Methodes gloables ---------
export const gMethods = {
    config: {
        domain: process.env.NODE_ENV === "production" ? "https://api-ecommerce.sagenicolas.fr" : "http://localhost:3000",
        token: null,
    },
    modeEdition: false,
    loading: true,
    userConnected: null,
    isPhone: false,
    iframeImg: {
        show: false,
        url: null
    },
    message: {
        show: false,
        text: null,
        color: null,
        timeout: 5000
    },
    reroot: [
        {
            page: 'accueil',
            url: '/'
        }
    ],
    getPage() {
        let page = this.reroot.find((page) => page.url == document.location.pathname)?.page || document.location.pathname.replace('/', '')
        return page == 'administration-site' ? 'Général' : page

    },
    recherche: '',
    goto(url, newTab = false) {

        if (newTab) {
            window.open(url, '_blank');
        } else {
            if (url.includes(document.location.origin)) {
                url = url.replaceAll(document.location.origin, '')
                router.push('' + url)
            } else {
                router.push('/' + url)

            }
        }

    },
    breadcrumbsUrl(item) {
        this.goto(item.url)
    },
    getColorTheme(color) {
        return myCustomLightTheme.colors[color]
    },
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line
            let r = Math.random() * 16 | 0,
                // eslint-disable-next-line
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            // eslint-disable-next-line
            return v.toString(16);
        });
    },
    dateFormat(date, format) {
        if (date) {
            let dateF = new Date(date)
            return format.replace('YYYY', dateF.getFullYear()).replace('MM', ('0' + (dateF.getMonth() + 1)).slice(-2)).replace('DD', ('0' + dateF.getDate()).slice(-2))
        }
    },
    getStyleText(style) {
        if (!style) return ''
        return `color: ${style?.color || 'black'}!important;
                text-shadow: ${style?.shadow ? '2px 2px 4px #000000' : 'none'}!important;
                font-weight: ${style?.bold ? 'bold!important' : 'normal'}!important;
                font-size: ${style?.fontSize || '24px'}!important;`
    },

    // --------- Methodes pour les administrations ---------
    contenu: null,
    pages: [],
    blocs: [],
    commandes: [],

    async getContenu() {
        this.loading = true

        try {
            const response = await axios.get(`${this.config.domain}/contenu`,)

            //load contenu website
            for await (let contenu of response.data) {
                if (contenu.image) {
                    contenu = await this.setImagesContenu(contenu)
                }
            }
            this.contenu = response.data


            //set pages of website
            this.pages = [...new Set(response.data.map((item) => { return item.page }))]
            this.loading = false

            return response.data
        } catch (error) {
            console.error("Error fetching products data:", error);
        }
    },
    getItemContenu(valeur) {
        return this.contenu.find((item) => item.valeur == valeur)?.contenu
    },
    async uploadImgContenu(originalname, file) {
        this.loading = true
        let formData = new FormData()
        file = new Blob([file], { type: 'image/jpeg' })
        formData.append('photos[]', file, originalname);
        try {
            let img = await axios.post(`${this.config.domain}/contenu/uploadImage`, formData)
            this.loading = false
            return img.data
        }
        catch (error) {
            console.error("Error fetching products data:", error);
        }
        return img
    },
    async setImagesContenu(contenu) {
        this.loading = true
        contenu.imagesBlob = []
        if (!contenu.image) return contenu
        for await (let image of contenu.image) {
            let img = await axios
                .get(`${this.config.domain}/contenu/image/${image}`)
                .then((response) => {
                    this.loading = false
                    return response.data

                })
                .catch((error) => {
                    console.error("Error fetching contenus data:", error);
                })

            contenu.imagesBlob.push(img)
        }
        return contenu
    },
    deleteImgContenu(uuid) {
        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        axios
            .delete(`${this.config.domain}/contenu/image/${uuid}`, header)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching products data:', error)
            })
    },
    async getBlocs() {
        if (this.blocs.length > 0) return
        await axios
            .get(`${this.config.domain}/bloc`)
            .then(async (response) => {
                this.blocs = response.data
                this.loading = false
                return
            })
            .catch((error) => {
                console.error('Error fetching products data:', error)
            })
        return

    },
    async insertBloc(bloc, index, page) {
        bloc = { ...bloc, order: index, removable: true, valeur: '', contenu: null, page: page }

        if (bloc.type == 1) bloc.contenu = { texte: '' }
        if (bloc.type == 2) bloc.contenu = []
        if (bloc.type == 4) bloc.contenu = { url: '', titre: '', color: '' }
        if (bloc.type == 5) bloc.contenu = { nombre: 5, categories: [] }

        delete bloc.uuid

        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }

        await axios
            .post(`${this.config.domain}/contenu`, bloc, header)
            .then(async (response) => {
                this.contenu.splice(index, 0, response.data)
                let i = 0
                for await (let item of this.contenu.filter((item) => item.page == page)) {
                    item.order = i
                    await axios
                        .patch(`${this.config.domain}/contenu/${item.uuid}`, item, header)
                        .then((response) => {
                            console.log(response.data)
                        })
                        .catch((error) => {
                            console.error('Error fetching products data:', error)
                        })
                    i++
                }
                return
            })
            .catch((error) => {
                console.error('Error fetching products data:', error)
            })
    },
    saveContenu(contenu) {
        this.loading = true

        let body = contenu
        if (contenu?.type == 4) body.contenu.url.replaceAll(document.location.origin, '')

        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        try {
            const response = axios.patch(`${this.config.domain}/contenu/${contenu.uuid}`, contenu, header)
            this.loading = false
            this.message = {
                show: true,
                text: 'Contenu enregistré',
                color: 'success',
                timeout: 5000
            }
            return response.data
        }
        catch (error) {
            console.error("Error fetching products data:", error);
        }
        this.loading = false
        return error
    },
    deleteContenu(contenu, page) {
        this.loading = true
        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        axios
            .delete(`${this.config.domain}/contenu/${contenu.uuid}`, header)
            .then(async (response) => {
                this.contenu.splice(this.contenu.indexOf(contenu), 1)
                let i = 0

                for await (let item of this.contenu.filter((item) => item.page == page)) {
                    item.order = i
                    await axios
                        .patch(`${this.config.domain}/contenu/${item.uuid}`, item, header)
                        .then((response) => {
                            console.log(response.data)
                        })
                        .catch((error) => {
                            console.error('Error fetching products data:', error)
                        })
                    i++
                }

                this.loading = false
            })
            .catch((error) => {
                console.error('Error fetching products data:', error)
            })
    },

    // --------- Methodes pour les produits ---------
    categories: [],
    products: [],
    createProduct(product) {
        axios
            .post(`${this.config.domain}/product`, product)
            .then((response) => {
                product.uuid = response.data.uuid
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },

    async uploadImg(originalname, file) {
        this.loading = true
        let formData = new FormData()
        file = new Blob([file], { type: 'image/jpeg' })
        formData.append('photos[]', file, originalname);
        let img = await axios
            .post(`${this.config.domain}/product/uploadImage`, formData)
            .then((response) => {
                this.loading = false
                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
        return img
    },
    deleteImg(uuid) {
        axios
            .delete(`${this.config.domain}/product/image/${uuid}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching products data:', error)
            })
    },
    async setImagesProduct(product) {
        this.loading = true
        product.imagesBlob = []
        if (!product.image) return product
        for await (let image of product.image) {
            let img = await axios
                .get(`${this.config.domain}/product/image/${image}`)
                .then((response) => {
                    this.loading = false
                    return response.data

                })
                .catch((error) => {
                    console.error("Error fetching products data:", error);
                })

            product.imagesBlob.push(img)
        }
        return product
    },
    async getProducts() {
        this.loading = true
        await axios
            .get(`${this.config.domain}/product`)
            .then(async (response) => {
                for await (let product of response.data) {
                    product = await this.setImagesProduct(product)
                }
                this.products = response.data
                this.loading = false
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },

    async deleteProduct(product) {
        this.loading = true

        product?.image?.forEach((img) => {
            if (this.products.find((item) => item.image.includes(
                img
            )).length == 0) this.deleteImg(img)
        })

        await axios
            .delete(`${this.config.domain}/product/${product.uuid}`)
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
        if (typeof product.prix == 'string') product.prix = parseFloat(product.prix.replaceAll(',', '.'))
        if (typeof product.prixPromo == 'string') product.prixPromo = parseFloat(product.prixPromo.replaceAll(',', '.'))

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


    },
    formatPrix(prix, devise = false) {
        return prix ? prix?.toFixed(2).toString().replace('.', ',') + (devise ? ' €' : '') : ''
    },

    // --------- Methodes pour les commandes ---------
    menuCart: false,
    cart: null,
    etats: [
        { value: 1, text: 'En attente', color: 'orange' },
        { value: 2, text: 'En cours de livraison', color: 'orange' },
        { value: 3, text: 'Livrée', color: 'green' },
        { value: 4, text: 'Annulée', color: 'red' }
    ],

    productsOfCart(cart, products) {
        let cartDetails = []
        cart?.forEach((productCart) => {
            products.forEach((product) => {
                if (productCart.product == product.uuid) {
                    cartDetails.push({ ...product, ...productCart, variation: product?.variations?.find((item) => item.uuid == productCart.variation) || null })
                }
            })
        })
        return cartDetails
    },
    addInCart(product, user, quantity = 1, variation = null) {
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
                let index = cart.findIndex((item) => item.product === product.uuid && (!item.variation || item.variation == variation?.uuid))
                if (index !== -1) {
                    cart[index].quantity += parseInt(quantity)
                } else {
                    cart.push({
                        product: product.uuid,
                        quantity: quantity,
                        variation: variation?.uuid || null
                    })
                }
            } else {
                cart = [{
                    product: product.uuid,
                    quantity: quantity,
                    variation: variation?.uuid || null
                }]
            }
            this.cart = cart
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
            this.cart = cart
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
    async confirmationPaiement(CHECKOUT_SESSION_ID) {
        try {
            let header = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
                }
            }
            const response = await axios.post(`${this.config.domain}/commande/confirmation`, { CHECKOUT_SESSION_ID: CHECKOUT_SESSION_ID }, header)

            if (response.data == "ERROR") {
                this.message = {
                    show: true,
                    text: 'Erreur lors de la validation de votre commande.',
                    color: 'error',
                    timeout: 5000
                }
            }

            return response.data
        }
        catch (error) {
            console.error("Error fetching products data:", error);
        }
    },
    async editCommande(commande) {
        this.loading = true
        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        try {
            const response = await axios.patch(`${this.config.domain}/commande/${commande.uuid}`, commande, header)
            this.loading = false
            return response.data
        }
        catch (error) {
            console.error("Error fetching products data:", error);
        }
    },
    async getCommandes() {
        this.loading = true
        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        try {
            const response = await axios.get(`${this.config.domain}/commande`, header)
            this.commandes = response.data
            let users = await this.getUsers()
            if (users[0]) {
                this.commandes.forEach((commande) => {
                    commande.user = users?.find((user) => user.useruuid == commande.user)
                })
            }


            const promises = this.commandes.map(async (commande) => {
                commande.products = commande.products.map((product) => {
                    const productAll = this.products.find((item) => item.uuid == product.productuuid);
                    return { ...product, ...productAll };
                });
            });
            await Promise.all(promises);

            this.loading = false
            return response.data
        } catch (error) {
            console.error("Error fetching products data:", error);
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
    async createUser(body) {
        try {
            const response = await axios.post(`${this.config.domain}/user`, body);
            return response.data;
        } catch (error) {
            console.error("Error fetching products data:", error);
        }
    },
    editUser(body) {
        axios
            .patch(`${this.config.domain}/user/${body.uuid}`, body)
            .then((response) => {
                localStorage.removeItem('jwtToken');
                this.getProfileConnected()
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
    login(email, password) {
        let body = {
            email: email,
            password: password,
        }
        axios
            .post(`${this.config.domain}/auth/login`, body)
            .then((response) => {
                localStorage.setItem('jwtToken', JSON.stringify({ access_token: response.data.access_token }))
                this.getProfile(true)
                document.location.href = '/'
            })
            .catch((error) => {
                this.message = {
                    show: true,
                    text: 'Identifiants incorrects',
                    color: 'error',
                    timeout: 5000
                }
                console.error("Error fetching products data:", error);
            });
    },
    async sendCode(email) {
        try {
            const response = await axios.post(`${this.config.domain}/mail/sendCode`, {
                email: email
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching products data:", error);
        }
    },
    verifMailCode(mail, code) {
        axios
            .post(`${this.config.domain}/mail/verifCode`, {
                email: mail,
                code: code.replaceAll(' ', '')
            })

            .then((response) => {
                this.message = {
                    show: true,
                    text: 'Code valide, connexion à votre compte',
                    color: 'success',
                    timeout: 5000
                }
                localStorage.setItem('jwtToken', JSON.stringify({ access_token: response.data.access_token }))
                this.getProfile(true)
                if (!document.location.search.includes('fromRegister=true')) this.goto('user/new-password')
                return
            })
            .catch((error) => {
                this.message = {
                    show: true,
                    text: 'Code invalide, veuillez réessayer',
                    color: 'error',
                    timeout: 5000
                }
                this.goto('user/login')
            });
    },
    nouveauMDP(password) {
        this.loading = true
        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        axios
            .patch(`${this.config.domain}/user/nouveauMDP`, { password: password }, header)
            .then((response) => {
                this.loading = false
                this.message = {
                    show: true,
                    text: 'Mot de passe modifié',
                    color: 'success',
                    timeout: 5000
                }
                this.goto('')

                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    deleteAccount() {
        this.loading = true
        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        axios
            .delete(`${this.config.domain}/user/deleteAccount`, { password: password }, header)
            .then((response) => {
                this.loading = false
                this.goto('')

                return response.data
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    async getUsers() {
        this.loading = true
        let header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwtToken')).access_token
            }
        }
        try {
            const response = await axios.get(`${this.config.domain}/user`, header)
            this.loading = false
            return response.data
        }
        catch (error) {
            console.error("Error fetching users data:", error);
        }
    },

    // --------- Methodes pour les catégories ---------
    async getCategories() {
        this.loading = true
        await axios
            .get(`${this.config.domain}/categorie`)
            .then(async (response) => {
                for await (let categorie of response.data) {
                    if (categorie.image) categorie = await this.setImagesCategorie(categorie)
                }
                this.categories = response.data
                this.loading = false
            })
            .catch((error) => {
                console.error("Error fetching products data:", error);
            })
    },
    async setImagesCategorie(categorie) {
        this.loading = true
        let img = await axios
            .get(`${this.config.domain}/product/image/${categorie.image}`)
            .then((response) => {
                this.loading = false
                return response.data

            })
            .catch((error) => {
                console.error("Error fetching categorie data:", error);
            })

        categorie.imagesBlob = img
        return categorie
    },
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
