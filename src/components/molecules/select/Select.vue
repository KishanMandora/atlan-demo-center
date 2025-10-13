<template>
  <Select :aria-label="ariaLabel">
    <SelectTrigger class="w-full md:w-[180px] h-8" aria-label="Select">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent aria-label="Select content">
      <SelectGroup :id="id">
        <SelectLabel v-if="label">{{ label }}</SelectLabel>
        <SelectItem
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          aria-label="Select item"
        >
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Props {
  label?: string;
  id: string;
  items: { value: string; label: string }[];
  placeholder?: string;
  ariaLabel?: string;
}

defineProps<Props>();
</script>
