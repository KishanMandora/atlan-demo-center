<template>
  <div
    role="radiogroup"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :data-invalid="invalid"
    class="flex gap-2 overflow-x-auto my-2"
  >
    <template v-for="(item, i) in items" :key="item.id ?? item.value">
      <div
        class="relative h-8 flex items-center"
        tabindex="0"
        @keydown.enter.prevent="onEnter(item.value)"
      >
        <input
          class="peer sr-only"
          type="radio"
          :id="item.id ?? item.value.toString()"
          :name="props.name"
          :value="item.value"
          :checked="isChecked(item)"
          :disabled="disabled || item.disabled"
          :required="required"
          @change="onChange(item.value)"
          tabindex="-1"
        />

        <label
          :for="item.id ?? item.value.toString()"
          :data-checked="String(isChecked(item))"
          class="text-primary px-3 h-8 flex items-center rounded-2xl bg-primary-foreground border border-primary cursor-pointer data-[checked=true]:bg-primary data-[checked=true]:text-primary-foreground data-[checked=true]:border-transparent"
          :class="[chipClass]"
        >
          <slot
            name="item"
            :item="item"
            :checked="isChecked(item)"
            :index="i"
            :select="() => select(item.value)"
          >
            <span class="truncate text-sm">{{ item.label }}</span>
            <span v-if="item.right" class="opacity-80">{{ item.right }}</span>
          </slot>
        </label>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
type ChipValue = string | number;
export interface ChipItem {
  value: ChipValue;
  label?: string;
  right?: string;
  id?: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: ChipValue | null;
    items: ChipItem[];
    name: string;
    disabled?: boolean;
    required?: boolean;
    chipClass?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    invalid?: boolean;
  }>(),
  {
    name: '',
    disabled: false,
    required: false,
    chipClass: '',
    invalid: false
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: ChipValue | null): void;
  (e: 'change', v: ChipValue | null): void;
}>();

function isChecked(item: ChipItem) {
  return props.modelValue === item.value;
}

function select(v: ChipValue) {
  if (props.disabled) return;
  emit('update:modelValue', v);
  emit('change', v);
}
function onChange(v: ChipValue) {
  select(v);
}
function onEnter(v: ChipValue) {
  select(v);
}
</script>
