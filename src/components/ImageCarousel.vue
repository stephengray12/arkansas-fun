<template>
  <v-carousel
    height="360"
    hide-delimiter-background
    show-arrows="hover"
    cycle
    interval="5000"
  >
    <v-carousel-item v-for="(src, i) in images" :key="i" :src="src" cover />
  </v-carousel>
</template>

<script setup lang="ts">
defineProps<{
  images: string[];
}>();
</script>

<style scoped>
.carousel-card {
  overflow: hidden;
}
</style>
