<script setup lang="ts">
const imgUrl = localStorage.getItem(EAppStorageKey.LOGO_URL)
const rawHtml = localStorage.getItem(EAppStorageKey.QUILL_CONTENT)
</script>

<template>
  <div class="d-flex justify-center align-center mt-2">
    <img v-if="imgUrl" width="100" :src="imgUrl" />
    <div v-if="rawHtml" v-html="rawHtml" />
  </div>
</template>
