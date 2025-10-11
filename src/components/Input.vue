<template>
  <div>
    <label for="search" class="block text-sm/6 font-semibold text-white"
      >Search</label
    >
    <div class="mt-2.5">
      <input
        type="text"
        name="search"
        id="search"
        autocomplete="off"
        class="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base border border-black text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
        v-model="search"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDemos } from '@/store/useDemos';
const { search } = useDemos();
</script>
