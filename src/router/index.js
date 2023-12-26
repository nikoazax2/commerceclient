import { createRouter, createWebHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import Register from "../views/User/Register.vue";
import Login from "../views/User/Login.vue";
import Account from "../views/User/Account.vue";
import Produits from "../views/Product/Produits.vue";
import Produit from "../views/Product/Produit.vue";
import Gestion from "../views/Product/AdministrationProduits.vue";
import Panier from "../views/PanierVue.vue";
import Payer from "../views/Payer.vue";
import AdministrationSite from "../views/AdministrationSite.vue";
import PageSample from "../views/PageSample.vue";

const pageSamplePaths = ["/mentions-legales", "/politique-de-retour", "/guide-tailles", "/blog"]


const pageSampleRoutes = pageSamplePaths.map(path => ({
    path: path,
    name: path.substring(1), // remove the leading slash
    component: PageSample,
}));

const routes = [
    {
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: "/user/register",
        name: "S'inscrire",
        component: Register,
    },
    {
        path: "/user/login",
        name: "Se connecter",
        component: Login,
    },
    {
        path: "/user/account",
        name: "Profil",
        component: Account,
    },
    {
        path: "/product/list",
        name: "Produits",
        component: Produits,
    },
    {
        path: "/product/detail",
        name: "Produit",
        component: Produit,
    },
    {
        path: "/product/administration-products",
        name: "Gestion Produits",
        component: Gestion,
    },
    {
        path: "/panier",
        name: "Panier",
        component: Panier,
    },
    {
        path: "/paiement",
        name: "Payer",
        component: Payer,
    },
    {
        path: "/administration-site",
        name: "AdministrationSite",
        component: AdministrationSite,

    },
    ...pageSampleRoutes,


];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),

    routes,
});

router.beforeEach((to, from, next) => {
    let subdomain = window.location.host.split('.')[0]
    console.log(subdomain)
    if (subdomain != 'www' && subdomain != 'localhost:3000') {
        to.params['subdomain'] = subdomain
    }
    next()
})

export default router;
