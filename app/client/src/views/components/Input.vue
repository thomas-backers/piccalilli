<script setup lang="ts">
interface InputProps {
  errors?: string[];
  label?: string;
  modelValue: string;
  name: string;
  placeholder?: string;
  type: "text" | "email" | "password";
}

interface InputEmits {
  (eventName: "input", name: string, value: string): void;
  (eventName: "update:modelValue", value: string): void;
}

const {
  errors,
  label = "",
  modelValue,
  name,
  placeholder = "",
  type,
} = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const onInput = ({ currentTarget }: Event): void => {
  const { value } = currentTarget as HTMLInputElement;
  emit("update:modelValue", value);
  emit("input", name, value);
};
</script>

<template>
  <div>
    <label :for="name">
      {{ label }}
      <input
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        @input="onInput"
      />
    </label>
    <ul v-if="errors">
      <li v-for="(error, i) of errors" :key="i">
        {{ error }}
      </li>
    </ul>
  </div>
</template>
