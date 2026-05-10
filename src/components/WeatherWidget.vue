<template>
  <v-card class="weather-card" elevation="8">
    <v-card-title
      class="d-flex align-center justify-space-between flex-wrap ga-2 weather-title"
    >
      <div class="d-flex align-center ga-2">
        <v-icon icon="mdi-weather-partly-rainy" />
        <span>Outdoor Weather Near You</span>
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        :loading="loading"
        @click="emit('loadWeather')"
      >
        Refresh Weather
      </v-btn>
    </v-card-title>
    <v-card-text class="weather-content">
      <div class="weather-search-row">
        <v-autocomplete
          :model-value="selectedSuggestion"
          :search="searchQuery"
          :items="searchSuggestions"
          item-title="label"
          item-value="label"
          return-object
          label="Search city or state"
          placeholder="Start typing (example: Little Rock, Arkansas)"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
          :loading="searchingLocations"
          no-data-text="No location matches yet"
          class="weather-search-input"
          @update:search="emit('onSearchInput', $event)"
          @update:model-value="emit('onSuggestionSelected', $event)"
          @keyup.enter="emit('searchWeather')"
        />
        <v-btn
          color="secondary"
          :loading="loading"
          @click="emit('searchWeather')"
        >
          Search
        </v-btn>
        <v-btn
          variant="tonal"
          :loading="loading"
          @click="emit('loadCurrentLocationWeather')"
        >
          Use My Location
        </v-btn>
      </div>

      <div v-if="loading">Loading weather data...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div v-else-if="weather" class="weather-grid">
        <div class="weather-summary">
          <p class="weather-temp">{{ weather.temperature }}F</p>
          <p class="weather-condition">{{ weather.condition }}</p>
          <p class="weather-location">{{ weather.locationLabel }}</p>
          <p class="weather-updated">
            Updated: {{ formatDateTime(weather.time) }}
          </p>
          <p class="weather-coords">
            {{ weather.latitude.toFixed(3) }},
            {{ weather.longitude.toFixed(3) }}
          </p>
        </div>

        <div class="weather-metrics">
          <v-chip class="ma-1 metrics-chip" label>
            Wind: {{ weather.windSpeed }} mph
          </v-chip>
          <v-chip class="ma-1 metrics-chip" label>
            Rain now: {{ weather.rainNow }} in
          </v-chip>
          <v-chip class="ma-1 metrics-chip" label>
            Rain chance (6h): {{ weather.rainChanceNext6h }}%
          </v-chip>
          <v-chip class="ma-1 metrics-chip" label>
            Expected rain (12h): {{ weather.rainTotalNext12h }} in
          </v-chip>
        </div>

        <div class="weather-outdoor">
          <p class="advice-title">Outside Planner</p>
          <p>{{ weather.outdoorAdvice }}</p>
          <v-alert
            v-if="weather.rainRiskLevel === 'high'"
            type="warning"
            variant="tonal"
            density="comfortable"
            class="mt-3"
          >
            High rain risk in the next few hours. Bring rain gear or plan indoor
            backups.
          </v-alert>
          <v-alert
            v-else-if="weather.rainRiskLevel === 'medium'"
            type="info"
            variant="tonal"
            density="comfortable"
            class="mt-3"
          >
            Moderate rain risk in the next few hours. Keep backup plans handy.
          </v-alert>
          <v-alert
            v-else
            type="success"
            variant="tonal"
            density="comfortable"
            class="mt-3"
          >
            Low rain risk in the next few hours. Great window for outdoor
            activities.
          </v-alert>
        </div>
      </div>
      <div v-else>
        Click "Refresh Weather" to load weather for your current location.
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
type WeatherData = {
  latitude: number;
  longitude: number;
  temperature: number;
  windSpeed: number;
  condition: string;
  time: string;
  rainNow: number;
  rainChanceNext6h: number;
  rainTotalNext12h: number;
  rainRiskLevel: "low" | "medium" | "high";
  outdoorAdvice: string;
  locationLabel: string;
};

type SearchSuggestion = {
  label: string;
  latitude: number;
  longitude: number;
};

defineProps<{
  weather: WeatherData | null;
  loading: boolean;
  errorMessage: string;
  searchQuery: string;
  searchSuggestions: SearchSuggestion[];
  selectedSuggestion: SearchSuggestion | null;
  searchingLocations: boolean;
}>();

const emit = defineEmits<{
  onSearchInput: [value: string];
  onSuggestionSelected: [value: SearchSuggestion | null];
  searchWeather: [];
  loadCurrentLocationWeather: [];
  loadWeather: [];
}>();

function formatDateTime(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleString([], {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}
</script>

<style scoped>
.weather-card {
  background: linear-gradient(135deg, #10243f 0%, #0f3a2e 100%);
  color: #f4f7ff;
}

.weather-title {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #f9fbff;
}

.weather-content {
  min-height: 210px;
  color: #e9eefb;
}

.weather-search-row {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) auto auto;
  gap: 10px;
  margin-bottom: 14px;
  align-items: center;
}

.weather-search-input {
  min-width: 0;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  align-items: start;
}

.weather-summary,
.weather-metrics,
.weather-outdoor {
  background: rgba(6, 20, 37, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  padding: 14px;
}

.metrics-chip {
  background: #1f3b61;
  color: #f6f9ff;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.weather-temp {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

.weather-condition {
  font-size: 1.1rem;
  margin: 6px 0;
  color: #dce6ff;
}

.weather-updated {
  margin: 0;
  color: #b8c6e6;
}

.weather-location,
.weather-coords {
  margin: 6px 0 0;
  color: #d7e2ff;
}

.advice-title {
  font-weight: 700;
  margin-bottom: 8px;
  color: #ffffff;
}
</style>
