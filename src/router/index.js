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

const productionPath = process.env.NODE_ENV === "production" ? "/commerceclient" : "";

const pageSampleRoutes = pageSamplePaths.map(path => ({
    path,
    name: path.substring(1), // remove the leading slash
    component: PageSample,
}));

const routes = [
    {
        path: productionPath + "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: productionPath + "/user/register",
        name: "S'inscrire",
        component: Register,
    },
    {
        path: productionPath + "/user/login",
        name: "Se connecter",
        component: Login,
    },
    {
        path: productionPath + "/user/account",
        name: "Profil",
        component: Account,
    },
    {
        path: productionPath + "/product/list",
        name: "Produits",
        component: Produits,
    },
    {
        path: productionPath + "/product/detail",
        name: "Produit",
        component: Produit,
    },
    {
        path: productionPath + "/product/administration-products",
        name: "Gestion Produits",
        component: Gestion,
    },
    {
        path: productionPath + "/panier",
        name: "Panier",
        component: Panier,
    },
    {
        path: productionPath + "/paiement",
        name: "Payer",
        component: Payer,
    },
    {
        path: productionPath + "/administration-site",
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
