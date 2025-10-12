import { ref, watch, computed } from 'vue';

const demos = ref<any[]>([]); // add type later
const loading = ref(false);
const error = ref<string | null>(null);

const search = ref('');
const sort = ref<'views' | 'publishedDate'>('publishedDate');
const duration = ref<'quick' | 'short' | 'medium' | 'long' | 'depth' | 'all'>(
  'all'
);
const filtersData = ref<{ id: string; label: string; count: number }[]>([]);
const filters = ref<string[]>([]);
const page = ref(0);
const total = ref(0);

let debounceId: ReturnType<typeof setTimeout> | null = null;

async function fetchDemos(query = search.value) {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(
      `/api/demos.json?query=${encodeURIComponent(query)}
      &sort=${encodeURIComponent(sort.value)}
      &duration=${encodeURIComponent(duration.value)}
      &filters=${encodeURIComponent(filters.value.join(','))}
      &page=${page.value}`
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!filters.value.length) {
      const filtersResult = (data.items ?? []).reduce(
        (acc: Record<string, number>, item: any) => {
          const filters = item.filters || [];
          filters.forEach((filter: string) => {
            acc[filter] = (acc[filter] ?? 0) + 1;
          });
          return acc;
        },
        {}
      );

      filtersData.value = Object.entries(filtersResult)
        .map(([filter, count]) => ({
          id: filter,
          label: filter,
          count: count as number
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
    }

    if (page.value === 0) {
      demos.value = data.items ?? [];
    } else {
      demos.value.push(...(data.items ?? []));
    }
    total.value = data.total;
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load demos';
  } finally {
    loading.value = false;
  }
}

watch(search, (query) => {
  if (debounceId) clearTimeout(debounceId);
  debounceId = setTimeout(() => fetchDemos(query), 400);
});

// combine sort, duration, and filters
watch([sort], () => {
  page.value = 0;
  fetchDemos();
});

watch([duration], () => {
  page.value = 0;
  fetchDemos();
});

watch([filters], () => {
  page.value = 0;
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
    duration,
    filtersData,
    filters,
    hasResults,
    fetchDemos,
    total,
    page
  };
}
