<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import CustomInput from '../components/custom-input.vue'
import ErrorAlert from '../components/error-alert.vue'
import PrimaryBox from '../components/primary-box.vue'
import { login } from '../api/auth'
import { useRouter } from 'vue-router'

type LoginForm = {
  username: string
  password: string
}

const router = useRouter()
const { values, errors, setErrors, handleSubmit, resetForm } = useForm<LoginForm>()

const logUser = handleSubmit(async (state: LoginForm) => {
  const loginPayload = await login(state)
  if (loginPayload.isLeft()) {
    if (loginPayload.error.code === 'invalid_input') {
      setErrors(loginPayload.error.payload)
      return
    }

    toast.error(loginPayload.error.message, { position: 'top-right' })
    return
  }

  resetForm()
  router.replace('/')
})
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-semibold leading-9 text-gray-900">Log in to your account</h2>
      <span class="mt-3 text-base font-normal leading-6 text-gray-600">
        Welcome back! Please enter your details.
      </span>
      <form @submit="logUser" class="mt-8 flex w-96 flex-col gap-5">
        <error-alert :errors="errors" :hide-error="() => setErrors({})" />
        <custom-input
          name="username"
          label="username"
          placeholder="Enter your username"
          type="text"
          v-model:value="values.username"
        />
        <custom-input
          name="password"
          label="password"
          placeholder="Enter your password"
          type="password"
          v-model:value="values.password"
        />
        <button type="submit">
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
