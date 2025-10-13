<template>
  <div class="w-full py-4 px-3">
    <div class="flex justify-between items-center">
      <Text as="h2" size="text-lg" weight="font-bold" class="mb-3"
        >Filters</Text
      >
      <Button
        variant="outline"
        @click="filters = []"
        class="cursor-pointer"
        :disabled="filters.length === 0"
      >
        Clear Filters
      </Button>
    </div>
    <CheckboxGroup :items="filtersData" v-model="filters" />
    <div v-if="filtersData.length === 0" class="space-y-2">
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
      <Skeleton class="h-4 w-[200px] mb-2" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CheckboxGroup from '@/components/molecules/checkbox-group/CheckboxGroup.vue';
import { useDemos } from '@/store/useDemos';
import Text from '@/components/ui/Text.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import { Button } from '@/components/ui/button';

const { filtersData, filters } = useDemos();
</script>
