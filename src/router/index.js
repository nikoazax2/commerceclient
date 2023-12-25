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

const pathUrl = 'commerceclient/'
const pageSamplePaths = ["/mentions-legales", "/politique-de-retour", "/guide-tailles", "/blog"]

const pageSampleRoutes = pageSamplePaths.map(path => ({
    path,
    name: path.substring(1), // remove the leading slash
    component: PageSample,
}));

const routes = [
    {
        path: pathUrl + "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: pathUrl + "/user/register",
        name: "S'inscrire",
        component: Register,
    },
    {
        path: pathUrl + "/user/login",
        name: "Se connecter",
        component: Login,
    },
    {
        path: pathUrl + "/user/account",
        name: "Profil",
        component: Account,
    },
    {
        path: pathUrl + "/product/list",
        name: "Produits",
        component: Produits,
    },
    {
        path: pathUrl + "/product/detail",
        name: "Produit",
        component: Produit,
    },
    {
        path: pathUrl + "/product/administration-products",
        name: "Gestion Produits",
        component: Gestion,
    },
    {
        path: pathUrl + "/panier",
        name: "Panier",
        component: Panier,
    },
    {
        path: pathUrl + "/paiement",
        name: "Payer",
        component: Payer,
    },
    {
        path: pathUrl + "/administration-site",
        name: "AdministrationSite",
        component: AdministrationSite,

    },
    ...pageSampleRoutes,


];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
