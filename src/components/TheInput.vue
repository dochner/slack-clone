<script setup lang="ts">
type Props = {
  modelValue?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  icon?: string;
  iconRight?: string;
  debounce?: number;
};

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  debounce: 0,
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const handleInput = useDebounceFn((event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}, props.debounce);

const isFocused = ref<boolean>(false);

const toggleFocus = (value: boolean) => {
  isFocused.value = value;
};
</script>

<template>
  <label class="the-input">
    <span v-if="label" class="the-input__label">{{ label }}</span>

    <div
      class="flex overflow-hidden rounded-md border-2 bg-dark-200 border-dark-100 hover:border-dark-50 shadow min-h-10 transition-colors text-white"
      :class="isFocused ? '!border-lime' : ''"
    >
      <div v-if="icon" class="w-5 h-5" :class="icon"></div>
      <input
        class="the-input__input flex-grow focus:outline-none focus:border-none px-3 bg-transparent placeholder-stone-400"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="toggleFocus(true)"
        @blur="toggleFocus(false)"
      />

      <div v-if="iconRight" class="w-5 h-5" :class="iconRight"></div>
    </div>
  </label>
</template>
