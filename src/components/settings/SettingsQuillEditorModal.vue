<script setup lang="ts">
import { toast } from 'vue3-toastify'

const modalsStore = useModalsStore()
const content = ref('')

const handleInsertContent = () => {
  console.log(content.value)
  if (!content.value) {
    toast.error(quillContentRequired, { theme: 'auto' })
    return
  }

  localStorage.setItem(EAppStorageKey.QUILL_CONTENT, content.value)
  modalsStore.hideModal('settingsQuillEditorModal')
  toast.success(quillContentSaveSuccess, { theme: 'auto' })
  content.value = ''
}

const handleCloseModal = () => {
  modalsStore.hideModal('settingsQuillEditorModal')
  content.value = ''
}
</script>

<template>
  <v-dialog min-height="400px" v-model="modalsStore.getSettingsQuillEditorModal">
    <v-card>
      <v-card-text>
        <QuillEditor v-model:content="content" contentType="html" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit" @click="handleInsertContent"> Save </v-btn>
        <v-btn color="secondary" @click="handleCloseModal"> Close Dialog </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
