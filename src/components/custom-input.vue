<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
})

const emit = defineEmits(['update:value'])
const updateValue = (event: Event) => {
  emit('update:value', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="flex flex-col">
    <label :for="name" class="text-sm font-medium capitalize leading-5 text-gray-700">
      {{ label }}
    </label>
    <input
      :id="name"
      class="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 shadow-sm"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>
