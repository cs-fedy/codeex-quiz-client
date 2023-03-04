<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue'
import primaryBox from '../primary-box.vue'
import secondaryBox from '../secondary-box.vue'

type TabProviderProps = {
  selectTab: (tabId: string) => void
  selectedTabId: ComputedRef<string>
}

type TabItemProps = {
  tabId: string
}

const props = defineProps<TabItemProps>()
const { selectTab, selectedTabId } = inject('select-control') as TabProviderProps
const isActive = computed(() => selectedTabId.value === props.tabId)
</script>

<template>
  <button type="button" @click="selectTab(tabId)" class="w-full">
    <primary-box v-if="isActive">
      <slot />
    </primary-box>
    <secondary-box v-if="!isActive">
      <slot />
    </secondary-box>
  </button>
</template>
