<template>
  <component :is="as" :class="finalClass" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type Size =
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl'
  | 'text-4xl'
  | 'text-5xl'
  | 'text-6xl'
  | 'text-7xl';

type Color =
  | 'text-default'
  | 'text-foreground'
  | 'text-primary'
  | 'text-primary-foreground'
  | 'text-secondary'
  | 'text-secondary-foreground'
  | 'text-muted'
  | 'text-muted-foreground'
  | 'text-accent'
  | 'text-accent-foreground'
  | 'text-destructive'
  | 'text-destructive-foreground';

type Weight =
  | 'font-normal'
  | 'font-bold'
  | 'font-semibold'
  | 'font-medium'
  | 'font-light'
  | 'font-thin';

type Align = 'text-left' | 'text-center' | 'text-right';

const props = withDefaults(
  defineProps<{
    as?: Tag;
    size?: Size;
    color?: Color;
    align?: Align;
    weight?: Weight;
    class?: string;
    style?: Record<string, string | number>;
    overrideClass?: string;
  }>(),
  {
    as: 'p',
    size: 'text-base',
    color: 'text-default',
    class: '',
    weight: 'font-normal',
    align: 'text-left'
  }
);

const finalClass = computed(() => {
  if (props.overrideClass) return props.overrideClass;
  const sizeClass = props.size ?? 'text-base';
  const colorClass = props.color ?? 'text-default';
  const weightClass = props.weight ?? 'font-normal';
  const alignClass = props.align ?? 'text-left';

  return `antialiased leading-normal ${sizeClass} ${colorClass} ${weightClass} ${alignClass} ${props.class}`;
});
</script>
