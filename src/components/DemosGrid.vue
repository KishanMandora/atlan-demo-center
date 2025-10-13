<template>
  <div class="p-6">
    <div
      class="w-full flex gap-2 justify-between items-start sticky top-18 bg-white z-10 lg:flex-row flex-col lg:items-center lg:justify-between"
    >
      <Chips
        v-model="sort"
        :items="sortingChoices"
        name="sort"
        class="md:w-3/10 lg:w-fit"
      />
      <div class="relative w-1/2 items-center">
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          class="pl-10 w-1/2 lg:w-full h-10"
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

      <div class="gap-2 hidden sm:flex">
        <Button
          variant="outline"
          size="icon"
          @click="display = 'grid'"
          :class="
            display === 'grid'
              ? 'bg-primary text-primary-foreground'
              : 'active:bg-primary active:text-primary-foreground cursor-pointer'
          "
        >
          <LayoutGrid class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          @click="display = 'list'"
          :class="
            display === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'active:bg-primary active:text-primary-foreground cursor-pointer'
          "
        >
          <TextAlignJustify class="w-4 h-4" />
        </Button>
      </div>
    </div>

    <!-- <div v-if="loading" class="text-gray-500">Loading demos…</div> -->

    <div v-if="error" class="text-red-600">Error: {{ error }}</div>

    <div v-else-if="!hasResults && !loading" class="text-gray-500">
      No demos found.
    </div>

    <div ref="el">
      <Container
        v-if="display === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6"
      >
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
            :description="demo.description"
            :featured="demo.featured"
            :views="demo.views"
          />
        </a>
        <GridSkeleton v-if="loading" />
      </Container>

      <Container
        v-if="display === 'list'"
        class="flex flex-col gap-6 w-full mt-6"
      >
        <a
          v-for="demo in demos"
          :key="demo.id"
          :href="`/demo/${demo.title?.toLowerCase().replace(/\s+/g, '-')}`"
        >
          <ListCard
            :title="demo.title"
            :thumbnail="demo.thumbnail"
            :publishedDate="demo.publishedDate"
            :duration="demo.duration"
            :filters="demo.filters"
            :description="demo.description"
            :featured="demo.featured"
            :views="demo.views"
          />
        </a>
        <ListSkeleton v-if="loading" />
      </Container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { Input } from '@/components/ui/input';
import { useDemos } from '@/store/useDemos';
import { LayoutGrid, Search, TextAlignJustify, X } from 'lucide-vue-next';
import { Chips } from '@/components/ui/chips';
import { Select } from '@/components/molecules/select';
import {
  sortingChoices,
  selectDurations,
  displayOptions
} from '@/constants/filtersAndSorts';
import Container from '@/components/molecules/container/Container.vue';
import Card from '@/components/molecules/card/Card.vue';
import { useInfiniteScroll } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { ListCard } from '@/components/molecules/list-card';
import { GridSkeleton } from '@/components/molecules/grid-skeleton';
import { ListSkeleton } from '@/components/molecules/list-skeleton';
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
  total,
  display
} = useDemos();

console.log('demos', demos);

useInfiniteScroll(
  () => window,
  async () => {
    if (!loading.value && total.value > demos.value.length) {
      page.value++;
      await fetchDemos();
    }
  },
  {
    distance: 700,
    canLoadMore: () => {
      return total.value > demos.value.length;
    }
  }
);

onMounted(() => fetchDemos());
</script>
