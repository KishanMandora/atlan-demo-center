<script setup lang="ts">
import { ref } from 'vue';
import CheckboxGroup from './molecules/checkbox-group/CheckboxGroup.vue';
import { useDemos } from '@/store/useDemos';
import Text from './ui/Text.vue';

const { filtersData, filters } = useDemos();

console.log('filtersData', filtersData);
</script>
<template>
  <div class="w-full py-4 px-3">
    <div>
      <Text as="h2" size="text-lg" weight="font-bold" class="mb-3"
        >Filters</Text
      >
    </div>
    <CheckboxGroup :items="filtersData" v-model="filters" />
  </div>
  <!-- <CheckboxGroup :items="filtersData" :modelValue="filters" /> -->
</template>
