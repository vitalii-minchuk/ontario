<script setup lang="ts">
const eventsStore = useEventsStore()

onBeforeMount(() => eventsStore.loadData())
</script>

<template>
  <CalendarHeader />
  <CalendarContent />
  <CalendarFooter />
  <CalendarCreateEventModal />
</template>
