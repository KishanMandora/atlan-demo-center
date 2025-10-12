<template>
  <Card
    class="p-0 min-w-80 w-80 flex h-107 gap-0 pb-4 overflow-hidden transition-all duration-100 hover:scale-105 relative"
  >
    <img
      :src="thumbnail"
      alt="Placeholder"
      class="w-full h-40 object-cover rounded-t-xl"
    />
    <div class="absolute top-0 right-0 pt-2 pr-2 flex gap-2">
      <Badge v-if="featured" variant="success" class="rounded-full">
        <Star class="size-3" /> {{ 'Featured' }}
      </Badge>
      <Badge v-if="views >= 1000" variant="warning" class="rounded-full">
        <Flame class="size-3" /> {{ 'Popular' }}
      </Badge>
    </div>
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
      {{ excerpt }}
    </CardDescription>
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
  excerpt: string;
  featured: boolean;
  views: number;
}

defineProps<Props>();
</script>
