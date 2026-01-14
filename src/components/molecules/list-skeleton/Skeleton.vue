<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="flex flex-row space-y-3 w-full">
    <Skeleton class="rounded-x p-0 w-60 h-60 gap-0 pb-4 overflow-hidden" />
    <div class="space-y-2 w-full">
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
    </div>
  </div>
  <div class="flex flex-row space-y-3 w-full">
    <Skeleton class="rounded-x p-0 w-60 h-60 gap-0 pb-4 overflow-hidden" />
    <div class="space-y-2 w-full">
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
    </div>
  </div>
  <div class="flex flex-row space-y-3 w-full">
    <Skeleton class="rounded-x p-0 w-60 h-60 gap-0 pb-4 overflow-hidden" />
    <div class="space-y-2 w-full">
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
      <Skeleton class="rounded-md bg-primary/10 h-16 w-full ml-6" />
    </div>
  </div>
</template>
