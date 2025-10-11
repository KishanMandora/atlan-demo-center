<template>
  <div class="p-6">
    <Input />

    <div class="mt-4 flex gap-2">
      <button class="px-3 py-1 border rounded" @click="sort = 'publishedDate'">
        Latest
      </button>
      <button class="px-3 py-1 border rounded" @click="sort = 'views'">
        Popular
      </button>
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
import Input from './Input.vue';
import { useDemos } from '@/store/useDemos';

const { demos, loading, error, hasResults, fetchDemos, sort } = useDemos();

onMounted(() => fetchDemos());
</script>
