<script setup lang="ts">
const eventsStore = useEventsStore()
</script>

<template>
  <div>
    <div v-for="event of eventsStore.getEvents" :key="event.id">{{ event.name }}</div>
  </div>
</template>
