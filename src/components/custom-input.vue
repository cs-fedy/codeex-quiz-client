<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
})
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.name" class="capitalize text-gray-700 font-medium text-sm leading-5">
      {{ props.label }}
    </label>
    <input
      :id="props.name"
      class="mt-1.5 rounded-lg px-3.5 py-2.5 bg-white border border-gray-300 shadow-sm w-full"
      :placeholder="props.placeholder"
      :type="props.type"
      :name="props.name"
      :value="props.value"
    />
  </div>
</template>
