<template>
  <v-container class="license-page py-8">
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="10" lg="9">
        <h1 class="text-h4 font-weight-bold mb-2">License Resources</h1>
        <p class="text-subtitle-1 mb-0">
          Find the right Arkansas Game and Fish license information and go
          directly to the official page.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="stretch" class="license-grid">
      <v-col
        v-for="license in licenseCards"
        :key="license.title"
        cols="12"
        md="6"
        class="license-col d-flex card-cell"
      >
        <v-card class="license-card h-100" elevation="8" rounded="xl">
          <v-card-item class="pt-6 px-6">
            <template #prepend>
              <div class="icon-wrap">
                <v-icon :icon="license.icon" size="26" color="primary" />
              </div>
            </template>
            <v-card-title class="text-h6 font-weight-bold card-title">{{
              license.title
            }}</v-card-title>
          </v-card-item>

          <v-card-text class="px-6 text-body-1 card-copy">{{
            license.description
          }}</v-card-text>

          <v-card-actions class="px-6 pb-6 card-actions">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              block
              :href="license.url"
              target="_blank"
              rel="noopener noreferrer"
              append-icon="mdi-open-in-new"
            >
              Go To Page
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="10" lg="9">
        <v-alert type="info" variant="tonal" density="comfortable">
          All links open official Arkansas Game and Fish Commission websites.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
type LicenseCard = {
  title: string;
  description: string;
  url: string;
  icon: string;
};

const licenseCards: LicenseCard[] = [
  {
    title: "Buy A License or Permit",
    description:
      "Go directly to the official AGFC purchasing portal to buy your license or permit.",
    url: "https://ar-licensing.s3licensing.com/",
    icon: "mdi-card-account-details-outline",
  },
  {
    title: "Fishing Licenses",
    description:
      "Review fishing license types, eligibility, and fees for Arkansas anglers.",
    url: "https://www.agfc.com/resources/licensing/fishing-license-descriptions-and-fees/",
    icon: "mdi-fish",
  },
  {
    title: "Hunting Licenses",
    description:
      "Find hunting license descriptions and pricing for residents and non-residents.",
    url: "https://www.agfc.com/resources/licensing/hunting-license-descriptions-and-fees/",
    icon: "mdi-bow-arrow",
  },
  {
    title: "Special & Lifetime Licenses",
    description:
      "Access disability, mobility-impaired, 65-plus, military retiree, and lifetime options.",
    url: "https://www.agfc.com/resources/licensing/disability-mobility-impaired-65-plus-military-retiree-lifetime-licenses/",
    icon: "mdi-shield-account-outline",
  },
];
</script>

<style scoped>
.license-page {
  background: transparent;
  max-width: 1100px;
}

.license-grid {
  margin-left: -18px;
  margin-right: -18px;
}

.card-cell {
  padding: 18px;
}

.license-card {
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(25, 50, 82, 0.1);
  transition: box-shadow 0.2s ease;
}

.license-card:hover {
  box-shadow: 0 10px 20px rgba(16, 45, 74, 0.12) !important;
}

.icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(25, 118, 210, 0.14);
}

.card-copy {
  line-height: 1.65;
  min-height: 110px;
  flex-grow: 1;
}

.card-title {
  min-height: 64px;
  display: flex;
  align-items: center;
}

.card-actions {
  margin-top: auto;
}

@media (max-width: 1366px) {
  .license-page {
    max-width: 1020px;
  }
}

@media (max-width: 1024px) {
  .license-card {
    min-height: 280px;
  }
}

@media (max-width: 768px) {
  .card-title,
  .card-copy {
    min-height: auto;
  }
}

@media (max-width: 960px) {
  .license-grid {
    margin-left: -10px;
    margin-right: -10px;
  }

  .card-cell {
    padding: 10px;
  }
}

@media (max-width: 600px) {
  .license-grid {
    margin-left: 0;
    margin-right: 0;
  }

  .card-cell {
    padding: 6px 0;
  }
}
</style>
