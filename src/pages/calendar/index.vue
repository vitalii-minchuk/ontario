<script setup lang="ts">
import { toast } from 'vue3-toastify'

// import { toast } from 'vue3-toastify'

const eventsStore = useEventsStore()
const loaderStore = useLoaderStore()

onBeforeMount(() => {
  loaderStore.showLoader()
  eventsStore
    .loadData()
    .catch(() => {
      toast.error('Something went wrong', { theme: 'auto' })
    })
    .finally(() => {
      loaderStore.hideLoader()
    })
})
</script>

<template>
  <v-container class="m-4">
    <CalendarHeader />
    <CalendarContent />
    <CalendarFooter />
    <CalendarCreateEventModal />
  </v-container>
</template>
