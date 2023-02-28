<script setup lang="ts">
import { useRouter } from 'vue-router'
import CustomInput from '../components/custom-input.vue'
import PrimaryBox from '../components/primary-box.vue'
import { register } from '../api/auth'
import { ONE_SECOND, userRegisteredMsg } from '../utils/constants'
import { useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import ErrorAlert from '../components/error-alert.vue'

const router = useRouter()
type RegisterForm = {
  username: string
  fullName: string
  email: string
  password: string
}

const { values, errors, setErrors, handleSubmit, resetForm } = useForm<RegisterForm>()

const registerUser = handleSubmit(async (state: RegisterForm) => {
  const createdUser = await register(state)
  if (createdUser.isLeft()) {
    if (createdUser.error.code === 'invalid_input') {
      setErrors(createdUser.error.payload)
      return
    }

    toast.error(createdUser.error.message, { position: 'top-right' })
    return
  }

  resetForm()
  toast.success(userRegisteredMsg, { position: 'top-right' })
  setTimeout(() => router.push('/login'), ONE_SECOND * 3)
})
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="flex w-full flex-col items-start">
        <h2 class="text-3xl font-semibold leading-9 text-gray-900">Sign up</h2>
        <span class="mt-3 text-base font-normal leading-6 text-gray-600">
          Unlock a World of Knowledge <br />
          Sign Up for Our Quiz Platform Now!
        </span>
      </div>
      <form @submit="registerUser" class="mt-8 flex w-96 flex-col gap-5">
        <error-alert :errors="errors" :hide-error="() => setErrors({})" />
        <custom-input
          name="username"
          label="username"
          placeholder="Enter your username"
          type="text"
          v-model:value="values.username"
        />
        <custom-input
          name="fullName"
          label="full name"
          placeholder="Enter your full name"
          type="text"
          v-model:value="values.fullName"
        />
        <custom-input
          name="email"
          label="email address"
          placeholder="Enter your email"
          type="email"
          v-model:value="values.email"
        />
        <custom-input
          name="password"
          label="password"
          placeholder="Enter your password"
          type="password"
          v-model:value="values.password"
        />
        <button type="submit">
          <primary-box>get started</primary-box>
        </button>
      </form>
      <div class="mt-8 flex items-center gap-2">
        <span class="text-sm font-normal leading-5 text-gray-600">Already have an account?</span>
        <router-link to="/login" class="text-sm font-semibold leading-5 text-primary-700"
          >log in</router-link
        >
      </div>
    </div>
  </div>
</template>
