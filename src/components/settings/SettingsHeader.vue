<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="mb-2 d-flex justify-end">
    <v-btn icon="mdi-arrow-left-bold-circle-outline" fab @click="router.back()" />
  </div>
</template>
