<script setup lang="ts">
const loaderStore = useLoaderStore()
</script>

<template>
  <v-app>
    <FullScreenLoader v-if="loaderStore.getIsLoading" />
    <RouterView />
    <Toast />
  </v-app>
</template>
