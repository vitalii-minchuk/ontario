<script setup lang="ts">
const modalsStore = useModalsStore()
const eventsStore = useEventsStore()

const handleCreateEvent = () => {
  const input = {
    // startDate: '2024-07-07T20:45:16.777Z',
    // endDate: '2024-07-07T20:46:33.961Z',
    // name: 'test44',
    // categoryId: '23585758-9bdc-4d54-8b98-670c6f1dda5f'
  }
  eventsStore.createEvent(input)
}

const handleCloseModal = () => {
  modalsStore.hideModal('createEventModal')
}
</script>

<template>
  <v-dialog v-model="modalsStore.getCreateEventModal">
    <v-card>
      <v-card-text> </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="handleCreateEvent">Create</v-btn>
        <v-btn color="secondary" @click="handleCloseModal">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
