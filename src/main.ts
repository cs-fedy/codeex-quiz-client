import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/login.vue'
import Register from './pages/register.vue'
import Settings from './pages/settings.vue'
import Profile from './pages/profile.vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { createPinia } from 'pinia'
import { useAuthStore, AuthStatus } from './store/auth'
import { Roles } from './utils/constants'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
    {
      path: '/settings',
      component: Settings,
      name: 'Settings',
      meta: { requiresLoggedIn: true, roles: [Roles.self] },
    },
    {
      path: '/profile',
      component: Profile,
      name: 'Profile',
      meta: { requiresLoggedIn: true, roles: [Roles.self] },
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

  if (to.meta.requiresLoggedIn) {
    if (auth.status === AuthStatus.loggedOut) return next('/login')
    const requiredRoles = to.meta.roles as Array<string>
    const satisfiesRequiredRole = auth.user.roles.some((role) => requiredRoles.includes(role))
    if (!satisfiesRequiredRole) return next('/unauthorized')
    return next()
  }

  if (!to.meta.requiresLoggedIn) {
    if (auth.status === AuthStatus.loggedIn) return next('/profile')
    return next()
  }
})
