import { createApp } from "vue"
import "./style.css"
import Home from "./pages/home.vue"
import App from "./App.vue"
import { createRouter, createWebHistory } from "vue-router"
import Login from "./pages/login.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "Home" },
    { path: "/login", component: Login, name: "Login" },
  ],
})

createApp(App).use(router).mount("#app")
