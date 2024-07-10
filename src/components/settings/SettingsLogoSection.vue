<script setup lang="ts">
import { toast } from 'vue3-toastify'

const modalsStore = useModalsStore()
const widget = window?.cloudinary?.createUploadWidget(
  {
    cloudName: import.meta.env.VITE_GLOB_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_GLOB_CLOUDINARY_UPLOAD_PRESET
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      localStorage.setItem(EAppStorageKey.LOGO_URL, result.info.url)
      toast.success('Image has been uploaded')
    }
    if (error) {
      toast.error('Something went wrong')
    }
  }
)

const handleOpenUploadWidget = () => widget?.open()
const handleOpenQuillEditor = () => modalsStore.showModal('settingsQuillEditorModal')
</script>

<template>
  <v-row class="my-2">
    <v-col>
      <h2>Change footer content</h2>
    </v-col>
    <v-col class="d-flex flex-column align-end">
      <v-btn class="mb-2" width="150" color="primary" @click="handleOpenUploadWidget">
        Upload Image
      </v-btn>
      <v-btn width="150" color="primary" @click="handleOpenQuillEditor"> Insert HTML </v-btn>
    </v-col>
  </v-row>
</template>
