<template>
  <div class="p-6">
    <div
      class="w-full flex gap-2 justify-between items-center sticky top-18 bg-white"
    >
      <Chips v-model="sort" :items="items" name="sort" />
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
    <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>

    <div v-else-if="!hasResults" class="text-gray-500">No demos found.</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="demo in demos"
        :key="demo.id"
        :href="`/demo/${demo.title?.toLowerCase().replace(/\s+/g, '-')}`"
      >
        <article
          class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            v-if="demo.thumbnail"
            :src="demo.thumbnail"
            :alt="demo.title"
            class="w-full h-40 object-cover rounded-md mb-3"
            loading="lazy"
          />
          <h2 class="text-lg font-semibold">{{ demo.title }}</h2>
          <p class="text-gray-600 text-sm">{{ demo.description }}</p>
        </article>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Input } from './ui/input';
import { useDemos } from '@/store/useDemos';
import { Search, X } from 'lucide-vue-next';
import { Chips } from './ui/chips';
import { Select } from './molecules/select';

const items = [
  { value: 'publishedDate', label: 'Latest' },
  { value: 'views', label: 'Popular' }
];

const selectDurations = [
  { value: 'all', label: 'All' },
  { value: 'quick', label: '0 - 15 minutes' },
  { value: 'short', label: '15 - 30 minutes' },
  { value: 'medium', label: '30 - 45 minutes' },
  { value: 'long', label: '45 - 60 minutes' },
  { value: 'depth', label: '60+ minutes' }
];

const {
  demos,
  loading,
  error,
  hasResults,
  fetchDemos,
  sort,
  search,
  duration
} = useDemos();

onMounted(() => fetchDemos());
</script>
