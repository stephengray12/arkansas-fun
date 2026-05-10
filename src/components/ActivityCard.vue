<template>
  <v-card class="activity-card">
    <img :src="image" :alt="title" class="activity-image" />
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="activity-text">
      {{ description }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
// Props
defineProps({
  title: String,
  image: String,
  description: String,
});
</script>

<style scoped>
.activity-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.activity-image {
  width: 100%;
  height: clamp(170px, 24vw, 220px);
  object-fit: cover;
}

.activity-text {
  flex-grow: 1;
}
</style>
