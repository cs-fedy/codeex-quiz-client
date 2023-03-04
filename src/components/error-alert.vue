<script setup lang="ts">
import { computed } from 'vue'
import InfoIcon from './icons/info.vue'
import CloseIcon from './icons/close.vue'

type InputErrorProps = {
  errors: Record<string, any>
  hideError: () => void
}

const props = defineProps<InputErrorProps>()
const values = computed(() => Object.values(props.errors))
</script>

<template>
  <div v-if="values.length > 0" className="mb-4 flex rounded-lg bg-[#fef2f2] p-4 text-[#dc2626]">
    <info-icon />
    <div className="ml-3 text-sm font-medium">{{ values[0] }}</div>
    <button
      type="button"
      @click="hideError"
      className="-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-[#fef2f2] p-1.5 text-[#dc2626] hover:bg-[#fca5a5] focus:ring-2 focus:ring-[#ef4444]"
    >
      <close-icon />
    </button>
  </div>
</template>
