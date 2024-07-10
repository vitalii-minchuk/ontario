<script setup lang="ts">
import { toast } from 'vue3-toastify'

const modalsStore = useModalsStore()
const eventsStore = useEventsStore()
const { lengthValue, required } = useFieldRules()
const name = ref('')
const date = ref('')
const category = ref<string | null>(null)
const isLoading = ref(false)

const resetForm = () => {
  category.value = null
  name.value = ''
  date.value = ''
}

const handleCreateEvent = () => {
  console.log(category.value)
  if (!name.value || !date.value || !category.value || isLoading.value) return

  const dateAsISOString = new Date(date.value).toISOString()
  const input = {
    startDate: dateAsISOString,
    endDate: dateAsISOString,
    name: name.value,
    categoryId: category.value
  }

  eventsStore
    .createEvent(input)
    .then(() => {
      return eventsStore.loadData()
    })
    .then(() => {
      toast.success(createEventSuccessMessage, { theme: 'auto' })
    })
    .catch(() => {
      toast.error(genericErrorMessage, { theme: 'auto' })
    })
    .finally(() => {
      resetForm()
      modalsStore.hideModal('createEventModal')
    })
}

const handleCloseModal = () => {
  if (isLoading.value) return

  modalsStore.hideModal('createEventModal')
}
</script>

<template>
  <v-dialog v-model="modalsStore.getCreateEventModal">
    <v-form @submit.prevent>
      <v-card :loading="isLoading">
        <v-card-text>
          <v-text-field v-model="name" :rules="[lengthValue, required]" label="Name" />
          <v-text-field type="date" v-model="date" :rules="[required]" label="Date" />
          <v-select
            v-model="category"
            :items="eventsCategories"
            item-value="categoryId"
            chips
            hide-details
            label="Category"
            item-title="name"
            :rules="[required]"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="isLoading" color="primary" type="submit" @click="handleCreateEvent">
            Create
          </v-btn>
          <v-btn :disabled="isLoading" color="secondary" @click="handleCloseModal">
            Close Dialog
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
