<template>
  <div class="flex flex-wrap gap-6" :class="class">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
