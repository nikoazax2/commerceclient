import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/User/Register.vue";
import Login from "../views/User/Login.vue";
import Account from "../views/User/Account.vue";
import Produits from "../views/Product/Produits.vue";
import Produit from "../views/Product/Produit.vue";
import Gestion from "../views/Product/AdministrationProduits.vue";
import Panier from "../views/PanierVue.vue";
import Payer from "../views/Paiement/Payer.vue";
import AdministrationSite from "../views/Administration/AdministrationSite.vue";
import PageSample from "../views/PageSample.vue";
import ResetMDP from "../views/User/ResetMDP.vue";
import VerifMail from "../views/User/VerifMail.vue";
import NewMDP from "../views/User/NewMDP.vue";
import AdminCommandes from "../views/Administration/AdminCommandes.vue";
import PaiementValide from "../views/Paiement/PaiementValide.vue";
import Commandes from "../views/User/Commandes"

const pageSamplePaths = ["/", "/mentions-legales", "/politique-de-retour", "/guide-tailles", "/blog"]


const pageSampleRoutes = pageSamplePaths.map(path => ({
    path: path,
    name: path.substring(1), // remove the leading slash
    component: PageSample,
}));

const routes = [
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
    {
        path: "/user/reset-password",
        name: "ResetMDP",
        component: ResetMDP,
    },
    {
        path: "/user/mail-verif",
        name: "VerifMail",
        component: VerifMail,
    },
    {
        path: "/user/new-password",
        name: "NewMDP",
        component: NewMDP,
    },
    {
        path: "/administration/commandes",
        name: "AdminCommandes",
        component: AdminCommandes,
    },
    {
        path: "/paiement-valide",
        name: "PaiementValide",
        component: PaiementValide,
    },
    {
        path: "/user/commandes",
        name: "Commandes",
        component: Commandes
    },
    ...pageSampleRoutes,


];

const router = createRouter({
    history: createWebHistory(process.env.NODE_ENV === 'production' ? '/' : '/'),

    routes,
});


export default router;
