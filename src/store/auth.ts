import { defineStore } from 'pinia'
import { logout, refreshUser } from '../api/auth'
import { getLoggedUser } from '../api/user'
import User from '../models/User'
import instance from '../utils/axios'
import { Stores } from '../utils/constants'

export enum AuthStatus {
  loggedIn = 'loggedIn',
  loggedOut = 'loggedOut',
}

export type StateProps =
  | { status: AuthStatus.loggedIn; token: string; user: User }
  | { status: AuthStatus.loggedOut; token: null; user: null }

const initialState: StateProps = { status: AuthStatus.loggedOut, token: null, user: null }

export const useAuthStore = defineStore(Stores.auth, {
  state: () => initialState as StateProps,
  actions: {
    async handleLogout() {
      const logoutResponse = await logout()
      this.$state = { status: AuthStatus.loggedOut, token: null, user: null }
      return logoutResponse
    },
    async handleRefresh() {
      const refreshResult = await refreshUser()
      if (refreshResult.isLeft()) return
      const accessToken = refreshResult.value.access.token
      instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
      })

      const handleUserResult = await getLoggedUser()
      if (handleUserResult.isRight()) {
        this.$state = {
          status: AuthStatus.loggedIn,
          token: accessToken,
          user: handleUserResult.value.loggedUser,
        }
      }
    },
  },
  getters: {
    auth: (state) => state,
  },
})
