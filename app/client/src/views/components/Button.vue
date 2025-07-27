<script setup lang="ts">
import Spinner from "@/views/components/Spinner.vue";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "reset" | "submit";
}

interface ButtonEmits {
  (eventName: "click"): void;
}

const {
  disabled = false,
  loading = false,
  type = "button",
} = defineProps<ButtonProps>();

const emit = defineEmits<ButtonEmits>();

const onClick = (): void => {
  emit("click");
};
</script>

<template>
  <button :disabled="disabled || loading" :type="type" @click="onClick">
    <span>
      <Spinner v-if="loading" />
      <slot v-else></slot>
    </span>
  </button>
</template>
