<script setup lang="ts">
interface FormEmits {
  (eventName: "submit"): void;
}

const emit = defineEmits<FormEmits>();

const onSubmit = async (): Promise<void> => {
  emit("submit");
};
</script>

<template>
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
</template>
