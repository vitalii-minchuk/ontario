<script setup lang="ts">
const widget = window?.cloudinary.createUploadWidget(
  {
    cloudName: import.meta.env.VITE_GLOB_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_GLOB_CLOUDINARY_UPLOAD_PRESET
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info)
    }
  }
)

const handleOpenUploadWidget = () => widget.open()
</script>

<template>
  <v-row class="my-2">
    <v-col>
      <h2>Change footer content</h2>
    </v-col>
    <v-col class="d-flex flex-column align-end">
      <v-btn class="mb-2" width="150" color="primary" @click="handleOpenUploadWidget"
        >Upload Image</v-btn
      >
      <v-btn width="150" color="primary">Insert HTML</v-btn>
    </v-col>
  </v-row>
</template>
