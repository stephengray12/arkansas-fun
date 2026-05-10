<script setup lang="ts">
import { ref } from "vue";
import AppFooter from "./components/AppFooter.vue";

const drawer = ref(false);
</script>

<template>
  <v-app class="app-shell" theme="dark">
    <!-- Top bar -->
    <v-app-bar color="orange" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <img
        src="./assets/images/company.png"
        alt="Logo"
        height="60"
        width="60"
        class="mr-0 d-none d-md-inline-flex"
      />

      <v-toolbar-title>Arkansas' Fun</v-toolbar-title>

      <!-- Quick links in top bar - hidden on mobile -->
      <v-spacer class="d-none d-md-flex" />
      <v-btn to="/" variant="text" class="d-none d-md-inline-flex">Home</v-btn>
      <v-btn
        to="/about"
        variant="text"
        prepend-icon="mdi-compass-outline"
        class="d-none d-md-inline-flex"
      >
        About
      </v-btn>
      <v-btn
        to="/contact"
        variant="text"
        prepend-icon="mdi-email-outline"
        class="d-none d-md-inline-flex"
      >
        Contact
      </v-btn>
      <v-btn to="/license" variant="text" class="d-none d-md-inline-flex"
        >License</v-btn
      >
      <v-btn to="/info" variant="text" class="d-none d-md-inline-flex"
        >Info</v-btn
      >
    </v-app-bar>

    <!-- Side drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item to="/" title="Home" prepend-icon="mdi-home" />
        <v-list-item
          to="/about"
          title="About"
          prepend-icon="mdi-compass-outline"
        />
        <v-list-item
          to="/contact"
          title="Contact"
          prepend-icon="mdi-email-outline"
        />
        <v-list-item
          to="/license"
          title="License"
          prepend-icon="mdi-file-document"
        />
        <v-list-item
          to="/info"
          title="Info"
          prepend-icon="mdi-information-outline"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Page content -->
    <v-main class="app-main">
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
:deep(.v-card) {
  position: relative;
  border: 1px solid rgba(34, 211, 238, 0);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
}

:deep(.v-card:hover) {
  transform: translateY(-6px) scale(1.015);
  border-color: rgba(34, 211, 238, 0.85);
  box-shadow:
    0 16px 30px rgba(15, 35, 65, 0.2),
    0 0 0 2px rgba(34, 211, 238, 0.2) !important;
}

@media (prefers-reduced-motion: reduce) {
  :deep(.v-card),
  :deep(.v-card:hover) {
    transition: none;
    transform: none;
  }
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1 0 auto;
}
</style>
