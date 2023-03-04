<script setup lang="ts">
import primaryBox from './primary-box.vue'
import Spinner from './icons/spinner.vue'

type SubmitButtonProps = {
  isSubmitting: boolean
}

const props = defineProps<SubmitButtonProps>()
</script>

<template>
  <button type="submit" class="w-full">
    <primary-box>
      <div v-if="isSubmitting" class="flex w-full items-center justify-center gap-4">
        <spinner />
        <span class="text-sm font-bold leading-6 text-purple-100">loading...</span>
      </div>
      <slot v-if="!isSubmitting" />
    </primary-box>
  </button>
</template>
