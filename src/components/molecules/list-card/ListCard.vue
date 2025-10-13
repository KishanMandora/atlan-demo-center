<template>
  <Card
    class="p-0 w-full min-w-full flex h-44 gap-0 pb-4 overflow-hidden transition-all duration-100 hover:scale-105 relative flex-row"
  >
    <div class="h-44 w-60">
      <img
        :src="thumbnail"
        alt="Placeholder"
        loading="lazy"
        class="h-44 min-w-60 max-w-60 object-cover rounded-t-xl"
      />
    </div>
    <div class="absolute top-0 left-0 pt-2 pr-2 flex gap-2 flex-col">
      <Badge v-if="featured" variant="success" class="rounded-full">
        <Star class="size-3" /> {{ 'Featured' }}
      </Badge>
      <Badge v-if="views >= 1000" variant="warning" class="rounded-full">
        <Flame class="size-3" /> {{ 'Popular' }}
      </Badge>
    </div>
    <div class="flex flex-col">
      <CardTitle class="px-6 text-lg font-bold mt-3">{{ title }}</CardTitle>
      <CardContent class="mt-2 px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Calendar class="size-3 text-muted-foreground" />
            <Text
              as="span"
              size="text-xs"
              color="text-muted-foreground"
              weight="font-medium"
            >
              {{ dateToStr(publishedDate) }}
            </Text>
          </div>
          <div class="flex items-center gap-2">
            <Clock4 class="size-3 text-muted-foreground" />
            <Text
              as="span"
              size="text-xs"
              color="text-muted-foreground"
              weight="font-medium"
            >
              {{ duration }} mins
            </Text>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-2 flex-wrap">
          <Badge v-for="filter in filters" :key="filter" variant="secondary">
            {{ filter }}
          </Badge>
        </div>
      </CardContent>
      <CardDescription
        class="px-6 text-muted-foreground text-sm line-clamp-4 mt-auto"
      >
        {{ description }}
      </CardDescription>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Calendar, Clock4, Star, Flame } from 'lucide-vue-next';
import { dateToStr } from '@/lib/utils';
import Text from '@/components/ui/Text.vue';
import Badge from '@/components/ui/badge/Badge.vue';

interface Props {
  title: string;
  thumbnail: string;
  publishedDate: string;
  duration: number;
  filters: string[];
  description: string;
  featured: boolean;
  views: number;
}

defineProps<Props>();
</script>
