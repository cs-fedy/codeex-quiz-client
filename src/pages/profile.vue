<script setup lang="ts">
import { AuthStatus, useAuthStore } from '../store/auth'
import primaryBox from '../components/primary-box.vue'
import secondaryBox from '../components/secondary-box.vue'
import { useRouter } from 'vue-router'

const { auth, handleLogout } = useAuthStore()
const router = useRouter()
const logUserOut = async () => {
  await handleLogout()
  router.replace('/login')
}
</script>

<template>
  <div
    class="mx-auto mt-10 flex w-full max-w-5xl flex-col items-center gap-10 border border-purple-100 bg-purple-50 p-10"
    v-if="auth.status === AuthStatus.loggedIn"
  >
    <div class="flex flex-col items-center gap-4">
      <div class="h-32 w-32 overflow-hidden rounded-full border border-purple-200 bg-purple-100">
        <img :src="auth.user.avatarURL" :alt="`${auth.user.fullName} profile picture`" />
      </div>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold capitalize text-gray-800">{{ auth.user.fullName }}</h1>
        <span class="text-sm font-semibold text-gray-600">@{{ auth.user.username }}</span>
      </div>
    </div>
    <div class="mx-20 flex w-full justify-between gap-4">
      <button type="button" class="w-full" @click="logUserOut">
        <secondary-box>logout</secondary-box>
      </button>
      <router-link to="/settings" class="w-full">
        <primary-box>update profile</primary-box>
      </router-link>
    </div>
  </div>
</template>
