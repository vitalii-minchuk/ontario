<script setup lang="ts">
const router = useRouter()

const handleBack = () => router.replace(EAppRouting.CALENDAR)
</script>

<template>
  <p>404 not found</p>
  <v-btn stacked prepend-icon="mdi-vuetify" @click="handleBack"> Back to calendar</v-btn>
</template>
