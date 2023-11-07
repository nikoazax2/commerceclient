import { createRouter, createWebHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import Register from "../views/User/Register.vue";
import Login from "../views/User/Login.vue";
import CreateProduct from "../views/Product/Create.vue";
import Account from "../views/User/Account.vue";
import Produits from "../views/Product/Produits.vue";
import Produit from "../views/Product/Produit.vue";
import Gestion from "../views/Product/Administration.vue";

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
        path: "/product/create",
        name: "Créer produit",
        component: CreateProduct,
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
        path: "/product/administration",
        name: "Gestion Produits",
        component: Gestion,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
