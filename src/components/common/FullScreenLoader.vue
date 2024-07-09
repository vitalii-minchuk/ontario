<script setup lang="ts">
const { getIsLoading, isLoading } = useLoaderStore()
console.log(getIsLoading, isLoading)
</script>

<template>
  <div class="backdrop">
    <v-progress-circular :size="50" color="secondary" indeterminate />
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
