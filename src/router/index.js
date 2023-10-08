import { createRouter, createWebHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import Register from "../views/User/Register.vue";
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
