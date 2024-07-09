<script setup lang="ts">
const modalsStore = useModalsStore()
const eventsStore = useEventsStore()
const router = useRouter()

const handleOpenCreateEventModal = () => {
  modalsStore.showModal('createEventModal')
}
</script>

<template>
  <v-row class="mb-2">
    <v-col cols="7">
      <v-select
        :model-value="eventsStore.getSelectedCategoryIds"
        :items="eventsCategories"
        item-value="categoryId"
        chips
        hide-details
        label="Show categories"
        multiple
        item-title="name"
        @update:model-value="eventsStore.setSelectedCategoryIds"
      />
    </v-col>
    <v-col cols="3">
      <v-btn height="56" color="primary" @click="handleOpenCreateEventModal"> Create Event </v-btn>
    </v-col>
    <v-col cols="2" class="d-flex justify-end">
      <v-btn icon="mdi-cog" fab @click="router.push(EAppRouting.SETTINGS)" />
    </v-col>
  </v-row>
</template>
