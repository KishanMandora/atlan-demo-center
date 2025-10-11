import { ref, watch, computed } from 'vue';

const demos = ref<any[]>([]); // add type later
const loading = ref(false);
const error = ref<string | null>(null);

const search = ref('');
const sort = ref<'views' | 'publishedDate'>('publishedDate');

let debounceId: ReturnType<typeof setTimeout> | null = null;

async function fetchDemos(query = search.value) {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(
      `/api/demos.json?query=${encodeURIComponent(
        query
      )}&sort=${encodeURIComponent(sort.value)}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    demos.value = data.items ?? [];
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load demos';
  } finally {
    loading.value = false;
  }
}

watch(search, (query) => {
  console.log('search', query);
  if (debounceId) clearTimeout(debounceId);
  debounceId = setTimeout(() => fetchDemos(query), 400);
});

watch([sort], () => {
  fetchDemos();
});

const hasResults = computed(() => !loading.value && demos.value.length > 0);

export function useDemos() {
  return {
    demos,
    loading,
    error,
    search,
    sort,
    hasResults,
    fetchDemos
  };
}
