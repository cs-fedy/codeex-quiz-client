<script setup lang="ts">
import { computed, ComputedRef, provide } from 'vue'

type TabsProps = {
  selectedTabId: string
}

type TabProviderProps = {
  selectTab: (tabId: string) => void
  selectedTabId: ComputedRef<string>
}

const props = defineProps<TabsProps>()
const emit = defineEmits(['update:selectedTabId'])
const selectTab = (tabId: string) => {
  emit('update:selectedTabId', tabId)
}

provide<TabProviderProps>('select-control', {
  selectTab,
  selectedTabId: computed(() => props.selectedTabId),
})
</script>

<template>
  <div class="mx-20 flex w-full flex-col items-center gap-4">
    <slot />
  </div>
</template>
