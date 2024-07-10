<script setup lang="ts">
import { toast } from 'vue3-toastify'

const modalsStore = useModalsStore()
const content = localStorage.getItem(EAppStorageKey.QUILL_CONTENT)
const logoUrl = localStorage.getItem(EAppStorageKey.LOGO_URL)
const widget = window?.cloudinary?.createUploadWidget(
  {
    cloudName: import.meta.env.VITE_GLOB_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_GLOB_CLOUDINARY_UPLOAD_PRESET
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      localStorage.setItem(EAppStorageKey.LOGO_URL, result.info.url)
      toast.success(uploadImgSuccessMessage)
    }
    if (error) {
      toast.error(genericErrorMessage)
    }
  }
)

const handleOpenUploadWidget = () => widget?.open()
const handleOpenQuillEditor = () => modalsStore.showModal('settingsQuillEditorModal')
const handleRemoveImage = () => {
  if (!logoUrl) return

  localStorage.removeItem(EAppStorageKey.LOGO_URL)
  toast.success(removeImgSuccessMessage)
}
const handleRemoveContent = () => {
  if (!content) return

  localStorage.removeItem(EAppStorageKey.QUILL_CONTENT)
  toast.success(removeQuillContentSuccessMessage)
}
</script>

<template>
  <v-row class="my-2">
    <v-col>
      <h2>Change footer content</h2>
    </v-col>
    <v-col class="d-flex flex-column align-end">
      <v-row>
        <v-btn class="mb-2" width="150" color="primary" @click="handleOpenUploadWidget">
          Upload Image
        </v-btn>
        <v-btn class="ml-2" width="150" color="error" @click="handleRemoveImage">
          Remove Image
        </v-btn>
      </v-row>
      <v-row>
        <v-btn width="150" color="primary" @click="handleOpenQuillEditor"> Insert HTML </v-btn>
        <v-btn class="ml-2" width="150" color="error" @click="handleRemoveContent">
          Remove HTML
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
