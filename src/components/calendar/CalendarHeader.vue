<script setup lang="ts">
const modalsStore = useModalsStore()

const handleOpenCreateEventModal = () => {
  modalsStore.showModal('createEventModal')
}
</script>

<template>
  <div>
    <v-select> </v-select>
    <v-btn color="primary" block @click="handleOpenCreateEventModal">Create Event</v-btn>
  </div>
</template>
