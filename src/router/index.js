import { createRouter, createWebHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import Register from "../views/User/Register.vue";
import Login from "../views/User/Login.vue";
import CreateProduct from "../views/Product/Create.vue";
import Account from "../views/User/Account.vue";

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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
