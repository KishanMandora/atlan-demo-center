<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm/6 font-semibold text-[rgb(var(--color-foreground))]"
    >
      {{ label }}
    </label>

    <div class="mt-2.5">
      <input
        :id="id"
        :name="name || id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :class="computedClass"
        :style="style"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: string;
  label?: string;
  id: string;
  name: string;
  placeholder?: string;
  modelValue: string | number;
  autocomplete?: string;
  class?: string;
  style?: Record<string, string | number>;
  overrideClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  autocomplete: 'off',
  class: ''
});

const computedClass = computed(() => {
  if (props.overrideClass) return props.overrideClass;

  // const base =
  //   'block w-full rounded-md bg-white/5 px-3.5 py-2 text-base border border-[rgb(var(--color-border))] ' +
  //   'text-[rgb(var(--color-foreground))] outline-1 -outline-offset-1 outline-white/10 placeholder:text-[rgb(var(--color-muted-foreground))] ' +
  //   'focus:outline-2 focus:-outline-offset-2 focus:outline-[rgb(var(--color-ring))]';

  return `${props.class}`;
});
</script>
