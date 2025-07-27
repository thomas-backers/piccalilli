<script setup lang="ts">
interface FormProps {
  errors?: string[];
}

interface FormEmits {
  (eventName: "submit"): void;
}

const { errors } = defineProps<FormProps>();

const emit = defineEmits<FormEmits>();

const onSubmit = async (): Promise<void> => {
  emit("submit");
};
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div v-if="$slots.inputs">
        <slot name="inputs"></slot>
      </div>
      <div v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
      <div v-if="$slots.redirections">
        <slot name="redirections"></slot>
      </div>
    </form>
    <ul v-if="errors">
      <li v-for="(error, i) of errors" :key="i">
        {{ error }}
      </li>
    </ul>
  </div>
</template>
