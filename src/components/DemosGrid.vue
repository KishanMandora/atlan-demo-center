<template>
  <div class="p-6">
    <!-- 🔍 Search box -->
    <input
      v-model="searchQuery"
      @input="handleSearch"
      type="text"
      placeholder="Search demos..."
      class="border rounded-md px-3 py-2 w-full md:w-1/2 mb-6"
    />

    <!-- Loading / error states -->
    <div v-if="loading" class="text-gray-500">Loading demos…</div>
    <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>

    <!-- Demo grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article
        v-for="demo in demos"
        :key="demo.id"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 🧩 Types
type Demo = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
};

// 🌐 State
const demos = ref<Demo[]>([]);
const searchQuery = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
let debounceTimeout: any = null;

// ⚙️ Fetch function
async function fetchDemos(query = '') {
  loading.value = true;
  error.value = null;

  try {
    const res = await fetch(`/api/demos.json?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    demos.value = data.items ?? [];
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load demos';
  } finally {
    loading.value = false;
  }
}

// 🔍 Triggered on search input (debounced)
function handleSearch() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchDemos(searchQuery.value);
  }, 400); // 400ms debounce to avoid spammy requests
}

// 🚀 Initial load
onMounted(() => fetchDemos());
</script>
