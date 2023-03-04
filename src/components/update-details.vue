<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import submitButton from './submit-button.vue'
import errorAlert from './error-alert.vue'
import customInput from './custom-input.vue'
import { AuthStatus, useAuthStore } from '../store/auth'

type UpdatePasswordForm = {
  username: string
  fullName: string
}
const { auth } = useAuthStore()
const initialValues = computed(() => {
  if (auth.status !== AuthStatus.loggedIn) return { username: '', fullName: '' }
  return { username: auth.user.username, fullName: auth.user.fullName }
})

const { values, errors, setErrors, handleSubmit, setValues, isSubmitting } =
  useForm<UpdatePasswordForm>({
    initialValues,
  })

const updateUser = handleSubmit(async (state) => {
  setValues(initialValues.value)
})
</script>

<template>
  <form @submit="updateUser" class="flex w-full flex-col gap-6 py-5">
    <error-alert :errors="errors" :hide-error="() => setErrors({})" />
    <!-- <div class="flex w-full flex-col items-center">update avatar</div> -->
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
    <submit-button :is-submitting="isSubmitting">update profile</submit-button>
  </form>
</template>
