import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { login, refreshUser } from '../api/auth'
import { getLoggedUser } from '../api/user'
import User from '../models/User'
import instance from '../utils/axios'
import { Stores } from '../utils/constants'

type LoginArgs = {
  username: string
  password: string
}

export enum AuthStatus {
  loggedIn = 'loggedIn',
  loggedOut = 'loggedOut',
}

export type StateProps =
  | { status: AuthStatus.loggedIn; token: string; user: User }
  | { status: AuthStatus.loggedOut }

const initialState: StateProps = { status: AuthStatus.loggedOut }

export const useAuthStore = defineStore(Stores.auth, {
  state: () => initialState as StateProps,
  actions: {
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
