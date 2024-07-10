<script setup lang="ts">
const eventsStore = useEventsStore()
const selectedCategory = ref<'holiday' | 'studying' | 'conference'>('holiday')
const color = ref('')
const selectedFont = ref('14px')
const borderRadius = ref('16px')

const exampleStyles = computed(() => ({
  backgroundColor: color.value,
  fontSize: selectedFont.value,
  borderRadius: borderRadius.value
}))

const handleSubmit = () => {
  eventsStore.setEventStyle(selectedCategory.value, exampleStyles.value)
}
</script>

<template>
  <v-row class="my-6">
    <v-col>
      <h2>Change event style</h2>
      <div class="event-box">
        <p class="event" :style="exampleStyles">example</p>
      </div>
    </v-col>
    <v-col>
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="3">
            <h4>Category</h4>
          </v-col>
          <v-col cols="9">
            <v-radio-group inline v-model="selectedCategory">
              <v-radio
                v-for="category in eventsCategories"
                :key="category.categoryId"
                :label="category.label"
                :value="category.name"
              />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <h4>Font Size</h4>
          </v-col>
          <v-col cols="9">
            <v-radio-group inline v-model="selectedFont">
              <v-radio
                v-for="font in fontOptions"
                :key="font.font"
                :label="font.label"
                :value="font.font"
              />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <h4>Border</h4>
          </v-col>
          <v-col cols="9">
            <v-radio-group inline v-model="borderRadius">
              <v-radio
                v-for="border in borderRadiusOptions"
                :key="border.radius"
                :label="border.label"
                :value="border.radius"
              />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <h4>Color</h4>
          </v-col>
          <v-col cols="9">
            <v-color-picker v-model="color" />
          </v-col>
        </v-row>
        <v-btn color="primary" type="submit">Save</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<style>
.event-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.event {
  display: inline-block;
  padding: 4px 8px;
}
</style>
