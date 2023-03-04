<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'

type TabItemProps = {
  tabId: string
}

type TabProviderProps = {
  selectTab: (tabId: string) => void
  selectedTabId: ComputedRef<string>
}

const props = defineProps<TabItemProps>()
const { selectedTabId } = inject('select-control') as TabProviderProps
const isActive = computed(() => selectedTabId.value === props.tabId)
console.log(props.tabId, isActive)
</script>

<template>
  <slot v-if="isActive" />
</template>
