<template>
  <div class="p-6">
    <div
      class="w-full flex gap-2 justify-between items-center sticky top-18 bg-white"
    >
      <Chips v-model="sort" :items="sortingChoices" name="sort" />
      <div class="relative w-1/2 items-center">
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          class="pl-10 w-full h-10"
          v-model="search"
          autocomplete="off"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-6 text-muted-foreground" />
        </span>
        <span
          class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
        >
          <button @click="search = ''" v-if="search">
            <X class="size-6 text-muted-foreground cursor-pointer" />
          </button>
        </span>
      </div>

      <Select
        :id="duration"
        :items="selectDurations"
        placeholder="Duration"
        v-model="duration"
      />
    </div>

    <div v-if="loading" class="text-gray-500">Loading demos…</div>

    <div v-if="error" class="text-red-600">Error: {{ error }}</div>

    <div v-else-if="!hasResults && !loading" class="text-gray-500">
      No demos found.
    </div>

    <div ref="el">
      <Container class="mt-6">
        <a
          v-for="demo in demos"
          :key="demo.id"
          :href="`/demo/${demo.title?.toLowerCase().replace(/\s+/g, '-')}`"
        >
          <Card
            :title="demo.title"
            :thumbnail="demo.thumbnail"
            :publishedDate="demo.publishedDate"
            :duration="demo.duration"
            :filters="demo.filters"
            :excerpt="demo.excerpt"
          />
        </a>
      </Container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { Input } from '@/components/ui/input';
import { useDemos } from '@/store/useDemos';
import { Search, X } from 'lucide-vue-next';
import { Chips } from '@/components/ui/chips';
import { Select } from '@/components/molecules/select';
import { sortingChoices, selectDurations } from '@/constants/filtersAndSorts';
import Container from '@/components/molecules/container/Container.vue';
import Card from '@/components/molecules/card/Card.vue';
import { useInfiniteScroll } from '@vueuse/core';
const el = useTemplateRef<HTMLElement>('el');

const {
  demos,
  loading,
  error,
  hasResults,
  fetchDemos,
  sort,
  search,
  duration,
  page,
  total
} = useDemos();

useInfiniteScroll(
  () => window,
  async () => {
    if (!loading.value && total.value > demos.value.length) {
      page.value++;
      await fetchDemos();
    }
  },
  {
    distance: 10,
    canLoadMore: () => {
      return total.value > demos.value.length;
    }
  }
);

onMounted(() => fetchDemos());
</script>
