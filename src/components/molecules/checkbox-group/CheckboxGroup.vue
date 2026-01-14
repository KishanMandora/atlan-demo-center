<template>
  <div class="space-y-3">
    <h3 v-if="label" class="text-sm font-medium text-muted-foreground">
      {{ label }}
    </h3>

    <div class="space-y-2 flex flex-row flex-wrap gap-4 sm:block">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center space-x-2"
      >
        <Checkbox
          :disabled="item.disabled"
          :checked="isChecked(item.id)"
          :model-value="isChecked(item.id)"
          @update:model-value="toggleOne(item.id, $event)"
          :id="item.id"
          @update:checked="(val: boolean | 'indeterminate') => toggleOne(item.id, val)"
          @keydown.enter.prevent="toggleOne(item.id, !isChecked(item.id))"
        />
        <label
          :for="item.id"
          class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {{ item.label }}
          <span v-if="item?.count" class="text-xs text-muted-foreground"
            >({{ item.count }})</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';

type Item = { id: string; label: string; disabled?: boolean; count?: number };

const props = defineProps<{
  items: Item[];
  modelValue: string[];
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
}>();

function toggleOne(id: string, checked: boolean | 'indeterminate') {
  const isChecked = checked === true;
  const filtersSet = new Set(props.modelValue);
  isChecked ? filtersSet.add(id) : filtersSet.delete(id);
  const updatedFilters = Array.from(filtersSet);

  emit('update:modelValue', updatedFilters);
  emit('change', updatedFilters);
}

function isChecked(id: string) {
  return props.modelValue.includes(id);
}
</script>
