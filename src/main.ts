import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory, useRouter } from 'vue-router'
import Home from './pages/home.vue'
import Login from './pages/login.vue'
import Register from './pages/register.vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { createPinia } from 'pinia'
import { useAuthStore, AuthStatus } from './store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
      meta: { public: true },
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
      meta: { requiresLoggedIn: false },
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
      meta: { requiresLoggedIn: false },
    },
  ],
})

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions)
  .mount('#app')

router.beforeEach(async (to, from, next) => {
  const { auth, handleRefresh } = useAuthStore()
  await handleRefresh()

  if (to.meta.public) return next()
  if (to.meta.requiresLoggedIn) {
    if (auth.status === AuthStatus.loggedOut) return next('/login')
    const requiredRoles = to.meta.roles as Array<string>
    const satisfiesRequiredRole = auth.user.roles.some((role) => requiredRoles.includes(role))
    if (!satisfiesRequiredRole) return next('/unauthorized')
    return next()
  }

  if (!to.meta.requiresLoggedIn) {
    if (auth.status === AuthStatus.loggedIn) {
      return next(from ?? '/home')
    }

    return next()
  }
})
