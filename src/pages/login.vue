<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from '../components/custom-input.vue'
import PrimaryBox from '../components/primary-box.vue'

const loginForm = ref({
  username: '',
  password: '',
})
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-semibold leading-9 text-gray-900">Log in to your account</h2>
      <span class="mt-3 text-base font-normal leading-6 text-gray-600">
        Welcome back! Please enter your details.
      </span>
      <form class="mt-8 flex w-96 flex-col gap-5">
        <custom-input
          name="username"
          label="username"
          placeholder="Enter your username"
          type="text"
          :value="loginForm.username"
        />
        <custom-input
          name="password"
          label="password"
          placeholder="Enter your password"
          type="password"
          :value="loginForm.password"
        />
        <button type="button">
          <primary-box>sign in</primary-box>
        </button>
      </form>
      <div class="mt-8 flex items-center gap-2">
        <span class="text-sm font-normal leading-5 text-gray-600">Don't have an account?</span>
        <router-link to="/register" class="text-sm font-semibold leading-5 text-primary-700"
          >Sign up</router-link
        >
      </div>
    </div>
  </div>
</template>
