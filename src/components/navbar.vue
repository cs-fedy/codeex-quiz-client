<script setup lang="ts">
import primaryBox from '../components/primary-box.vue'
import { AuthStatus, useAuthStore } from '../store/auth'

const { auth } = useAuthStore()
const handleLogout = () => {}
</script>

<template>
  <div class="w-full border border-b-gray-100 bg-white">
    <div class="flex flex-col items-center justify-center p-0">
      <div class="flex w-full items-center justify-between px-8 py-4">
        <div class="flex items-center gap-8">
          <router-link to="/" class="text-base font-semibold capitalize leading-6 text-gray-600"
            >home</router-link
          >
        </div>
        <div v-if="auth.status === AuthStatus.loggedOut" class="flex items-center gap-8">
          <router-link to="/login" class="font-bold capitalize text-primary-600">
            login
          </router-link>
          <router-link to="/register">
            <primary-box>sign up</primary-box>
          </router-link>
        </div>
        <div v-if="auth.status === AuthStatus.loggedIn" class="flex items-center gap-8">
          <button type="button" :on-click="handleLogout">
            <span class="font-bold capitalize text-primary-600">logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
