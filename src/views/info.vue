<template>
  <v-container class="info-page py-8">
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="10" lg="9">
        <h1 class="text-h4 font-weight-bold mb-2">
          Hunting & Fishing Regulations
        </h1>
        <p class="text-subtitle-1 mb-0">
          Quick access to official Arkansas Game and Fish handbook and
          regulation resources.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" align="stretch" class="info-grid">
      <v-col
        v-for="resource in regulationCards"
        :key="resource.title"
        cols="12"
        md="6"
        class="d-flex card-cell"
      >
        <v-card class="info-card h-100" elevation="6" rounded="xl">
          <v-card-item class="px-6 pt-6">
            <template #prepend>
              <div class="icon-wrap">
                <v-icon :icon="resource.icon" color="primary" size="24" />
              </div>
            </template>
            <v-card-title class="card-title">{{ resource.title }}</v-card-title>
          </v-card-item>

          <v-card-text class="resource-copy px-6">
            {{ resource.description }}
          </v-card-text>

          <v-card-actions class="px-6 pb-6 card-actions">
            <v-btn
              color="primary"
              variant="elevated"
              block
              :href="resource.url"
              target="_blank"
              rel="noopener noreferrer"
              append-icon="mdi-open-in-new"
            >
              Open Resource
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="10" lg="9">
        <v-alert type="info" variant="tonal" density="comfortable">
          Links open official Arkansas Game and Fish Commission pages.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
type RegulationCard = {
  title: string;
  description: string;
  url: string;
  icon: string;
};

const regulationCards: RegulationCard[] = [
  {
    title: "AGFC Code of Regulations",
    description:
      "Browse the official Arkansas Game and Fish regulations for hunting, fishing, season limits, and statewide rules.",
    url: "https://www.agfc.com/resources/code-of-regulations/",
    icon: "mdi-gavel",
  },
  {
    title: "Regulations Browser",
    description:
      "Open the full regulations browser used for detailed rule sections, addendums, and updates.",
    url: "https://www.agfc.com/resources/code-of-regulations/browse/collections/e097609a-4ef1-459f-98e2-5532730099f6",
    icon: "mdi-book-open-page-variant-outline",
  },
  {
    title: "Hunting License Guide",
    description:
      "View hunting license descriptions and fees to match legal hunting requirements in Arkansas.",
    url: "https://www.agfc.com/resources/licensing/hunting-license-descriptions-and-fees/",
    icon: "mdi-bow-arrow",
  },
  {
    title: "Fishing License Guide",
    description:
      "View fishing license descriptions and fees to stay compliant before fishing Arkansas waters.",
    url: "https://www.agfc.com/resources/licensing/fishing-license-descriptions-and-fees/",
    icon: "mdi-fish",
  },
  {
    title: "Season Dates and Events",
    description:
      "Use AGFC calendars to track permit deadlines, season dates, and other planning information.",
    url: "https://www.agfc.com/resources/all-calendars/",
    icon: "mdi-calendar-month-outline",
  },
];
</script>

<style scoped>
.info-page {
  max-width: 1120px;
}

.info-grid {
  margin-left: -14px;
  margin-right: -14px;
}

.card-cell {
  padding: 14px;
}

.info-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(25, 50, 82, 0.1);
}

.icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(25, 118, 210, 0.14);
}

.card-title {
  min-height: 56px;
  display: flex;
  align-items: center;
  font-weight: 700;
}

.resource-copy {
  line-height: 1.6;
  min-height: 120px;
  flex-grow: 1;
}

.card-actions {
  margin-top: auto;
}

@media (max-width: 1366px) {
  .info-page {
    max-width: 1020px;
  }
}

@media (max-width: 1024px) {
  .resource-copy {
    min-height: 105px;
  }
}

@media (max-width: 768px) {
  .card-title {
    min-height: auto;
  }

  .resource-copy {
    min-height: auto;
  }
}

@media (max-width: 960px) {
  .info-grid {
    margin-left: -8px;
    margin-right: -8px;
  }

  .card-cell {
    padding: 8px;
  }
}

@media (max-width: 600px) {
  .info-grid {
    margin-left: 0;
    margin-right: 0;
  }

  .card-cell {
    padding: 6px 0;
  }
}
</style>
