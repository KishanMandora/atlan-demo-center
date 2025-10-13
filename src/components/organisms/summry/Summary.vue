<template>
  <div class="rounded-lg p-4 border bg-primary-foreground">
    <Text as="h2" size="text-3xl" weight="font-bold"> Summary </Text>

    <div v-if="loading">
      <Skeleton class="w-full h-5 mt-3" />
      <Skeleton class="w-full h-5 mt-3" />
      <Skeleton class="w-full h-5 mt-3" />
      <Skeleton class="w-full h-5 mt-3" />
      <Skeleton class="w-full h-5 mt-3" />
    </div>

    <div v-for="value in summary" :key="value">
      <Text as="p" size="text-sm" weight="font-normal" class="mt-3">
        {{ value }}
      </Text>
    </div>
  </div>

  <div class="rounded-lg p-4 mt-10 border bg-primary-foreground">
    <Text as="h2" size="text-3xl" weight="font-bold"> Visual Tags </Text>
    <div v-if="loading">
      <Skeleton class="w-full h-5 mt-3" />
      <Skeleton class="w-full h-5 mt-3" />
      <Skeleton class="w-full h-5 mt-3" />
    </div>
    <div class="flex gap-4 flex-wrap">
      <div v-for="value in visualTags" :key="value">
        <Badge variant="secondary" class="mt-3">
          {{ value }}
        </Badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Text from '@/components/ui/Text.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import Badge from '@/components/ui/badge/Badge.vue';
interface Props {
  videoUrl: string;
}

const summary = ref<string[]>([]);
const visualTags = ref<string[]>([]);
const error = ref<string | null>(null);
const loading = ref<boolean>(false);

const props = defineProps<Props>();

onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch(
      `/api/youtube-summary.json?url=${encodeURIComponent(props.videoUrl)}`
    );
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();

    summary.value = data.summary;
    visualTags.value = data.visual_tags;
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to get transcript';
  }
  loading.value = false;
});
</script>
