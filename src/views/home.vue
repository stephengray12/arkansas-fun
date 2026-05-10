<template>
  <v-container>
    <v-row class="mb-6">
      <v-col cols="12">
        <WeatherWidget
          :weather="weather"
          :loading="loading"
          :errorMessage="errorMessage"
          :searchQuery="searchQuery"
          :searchSuggestions="searchSuggestions"
          :selectedSuggestion="selectedSuggestion"
          :searchingLocations="searchingLocations"
          @onSearchInput="onSearchInput"
          @onSuggestionSelected="onSuggestionSelected"
          @searchWeather="searchWeather"
          @loadCurrentLocationWeather="loadCurrentLocationWeather"
          @loadWeather="loadWeather"
        />
      </v-col>
    </v-row>

    <v-row class="activity-section" align="stretch">
      <v-col cols="12" sm="6" md="4" class="d-flex">
        <ActivityCard
          title="Fishing"
          :image="fishingImage"
          description="The Natural state has a great reputation for bass, trout, catfish and crappie fishing. Start with the White River! With its guided trout fishing tours, you'll have an unforgettable experience."
        />
      </v-col>

      <v-col cols="12" sm="6" md="4" class="d-flex">
        <ActivityCard
          title="Hiking"
          :image="hikingImage"
          description="Explore some of the best hiking around! From Mount Magazine to Pinnacle Mountain, we have some of the best trails and scenic views in the state."
        />
      </v-col>

      <v-col cols="12" sm="6" md="4" class="d-flex">
        <ActivityCard
          title="Hunting"
          :image="huntingImage"
          description="Arkansas is known for its abundant wildlife. We have a great reputation for white tail deer, turkey, and are known for the best duck hunting in the world."
        />
      </v-col>
    </v-row>

    <v-row class="carousel-section" justify="center">
      <v-col cols="12">
        <v-card class="carousel-card" elevation="8" rounded="xl">
          <v-card-title class="text-h5 font-weight-bold pb-1">
            Explore Arkansas
          </v-card-title>
          <v-card-subtitle class="pb-4">
            Carousel is ready for Arkansas.com images if you have permission to
            use them.
          </v-card-subtitle>

          <ImageCarousel :images="arkansasCarouselSlides" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import WeatherWidget from "../components/WeatherWidget.vue";
import ActivityCard from "../components/ActivityCard.vue";
import ImageCarousel from "../components/ImageCarousel.vue";

import fishingImage from "../assets/images/finishing.png";
import hikingImage from "../assets/images/hiking.png";
import huntingImage from "../assets/images/hunting.png";

import slide1 from "../assets/images/slide1.jpg";
import slide2 from "../assets/images/slide2.jpg";
import slide3 from "../assets/images/slide3.jpg";
import slide4 from "../assets/images/slide4.jpg";
import slide5 from "../assets/images/slide5.jpg";
import slide6 from "../assets/images/slide6.jpg";
import slide7 from "../assets/images/slide7.jpg";
import slide8 from "../assets/images/slide8.jpg";
import slide9 from "../assets/images/slide9.jpg";
import slide10 from "../assets/images/slide10.jpg";

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

type ActiveLocation = {
  latitude: number;
  longitude: number;
  label: string;
};

type GeocodeResult = {
  name?: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
};

type SearchSuggestion = {
  label: string;
  latitude: number;
  longitude: number;
};

const loading = ref(false);
const errorMessage = ref("");
const weather = ref<WeatherData | null>(null);
const searchQuery = ref("");
const searchSuggestions = ref<SearchSuggestion[]>([]);
const selectedSuggestion = ref<SearchSuggestion | null>(null);
const searchingLocations = ref(false);
const activeLocation = ref<ActiveLocation | null>(null);
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let searchRequestSerial = 0;

const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const arkansasCarouselSlides = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
];

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
}

function buildOutdoorAdvice(weather: {
  temperature: number;
  windSpeed: number;
  rainChanceNext6h: number;
  rainTotalNext12h: number;
}): string {
  const rainRiskLevel = getRainRiskLevel(weather.rainChanceNext6h);

  if (rainRiskLevel === "high") {
    return "High rain risk. Plan for wet conditions and bring rain gear.";
  }

  if (rainRiskLevel === "medium") {
    return "Moderate rain risk. Keep a rain layer handy and watch conditions.";
  }

  if (weather.windSpeed >= 20) {
    return "Breezy to windy conditions. Secure loose gear and use wind layers.";
  }

  if (weather.temperature >= 90) {
    return "Hot conditions expected. Carry extra water and avoid peak afternoon sun.";
  }

  if (weather.temperature <= 45) {
    return "Chilly conditions. Dress in layers and keep warm accessories handy.";
  }

  return "Conditions look favorable for fishing, hiking, and hunting.";
}

function getRainRiskLevel(rainChanceNext6h: number): "low" | "medium" | "high" {
  if (rainChanceNext6h <= 20) {
    return "low";
  }

  if (rainChanceNext6h <= 29) {
    return "medium";
  }

  return "high";
}

function buildLocationLabel(result: {
  name?: string;
  admin1?: string;
  country?: string;
}): string {
  const primaryParts = [result.name, result.admin1].filter(Boolean);

  if (primaryParts.length > 0) {
    return primaryParts.join(", ");
  }

  return result.country ?? "Selected location";
}

function buildSuggestionLabel(result: {
  name?: string;
  admin1?: string;
  country?: string;
}): string {
  const labelParts = [result.name, result.admin1, result.country].filter(
    Boolean,
  );

  if (labelParts.length > 0) {
    return labelParts.join(", ");
  }

  return "Unknown location";
}

async function geocodeLocationsByName(
  name: string,
  count = 8,
): Promise<GeocodeResult[]> {
  const geocodeResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=${count}&language=en&format=json`,
  );

  if (!geocodeResponse.ok) {
    throw new Error("Unable to search that location right now.");
  }

  const geocodeData = await geocodeResponse.json();
  return geocodeData.results ?? [];
}

function onSuggestionSelected(value: SearchSuggestion | null) {
  selectedSuggestion.value = value;

  if (value) {
    searchQuery.value = value.label;
  }
}

function onSearchInput(value: string) {
  if (!value.trim()) {
    searchSuggestions.value = [];
    return;
  }

  if (
    selectedSuggestion.value &&
    value.trim() !== selectedSuggestion.value.label
  ) {
    selectedSuggestion.value = null;
  }

  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  searchDebounceTimer = setTimeout(() => {
    void loadSearchSuggestions(value);
  }, 300);
}

async function loadSearchSuggestions(rawQuery: string) {
  const query = rawQuery.trim();

  if (!query) {
    searchSuggestions.value = [];
    return;
  }

  const requestId = ++searchRequestSerial;
  searchingLocations.value = true;

  try {
    const results = await geocodeLocationsByName(query, 8);

    if (requestId !== searchRequestSerial) {
      return;
    }

    searchSuggestions.value = results.map((result: GeocodeResult) => ({
      label: buildSuggestionLabel(result),
      latitude: result.latitude,
      longitude: result.longitude,
    }));
  } catch {
    if (requestId === searchRequestSerial) {
      searchSuggestions.value = [];
    }
  } finally {
    if (requestId === searchRequestSerial) {
      searchingLocations.value = false;
    }
  }
}

async function reverseGeocodeLocation(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`,
    );

    if (!response.ok) {
      return "Your current location";
    }

    const data = await response.json();
    const result: GeocodeResult | undefined = data.results?.[0];

    if (!result) {
      return "Your current location";
    }

    return buildLocationLabel(result);
  } catch {
    return "Your current location";
  }
}

async function fetchWeatherForCoordinates(location: ActiveLocation) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m,rain&hourly=precipitation_probability,precipitation&forecast_hours=12&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch weather data (status ${response.status}).`,
    );
  }

  const data = await response.json();
  const current = data.current;
  const rainChanceHourly: number[] =
    data.hourly?.precipitation_probability ?? [];
  const rainHourly: number[] = data.hourly?.precipitation ?? [];
  const next6hRainChance = rainChanceHourly.slice(0, 6);
  const next12hRain = rainHourly.slice(0, 12);

  const rainChanceNext6h = next6hRainChance.length
    ? Math.max(...next6hRainChance)
    : 0;
  const rainTotalNext12h = next12hRain.reduce((sum, val) => sum + val, 0);
  const rainRiskLevel = getRainRiskLevel(rainChanceNext6h);

  const advice = buildOutdoorAdvice({
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    rainChanceNext6h,
    rainTotalNext12h,
  });

  weather.value = {
    latitude: location.latitude,
    longitude: location.longitude,
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    condition: weatherCodeMap[current.weather_code] ?? "Unknown",
    time: current.time,
    rainNow: current.rain,
    rainChanceNext6h,
    rainTotalNext12h: Number(rainTotalNext12h.toFixed(2)),
    rainRiskLevel,
    outdoorAdvice: advice,
    locationLabel: location.label,
  };

  activeLocation.value = location;
}

function getLocationErrorMessage(error: { code: number }): string {
  if (error.code === 1) {
    return "Location permission was denied. Please allow location access and try again.";
  }

  if (error.code === 2) {
    return "Your location is unavailable right now. Please try again.";
  }

  if (error.code === 3) {
    return "Location request timed out. Please try again.";
  }

  return "Unable to retrieve your location.";
}

async function loadCurrentLocationWeather() {
  loading.value = true;
  errorMessage.value = "";

  try {
    const position = await getCurrentPosition();
    const label = await reverseGeocodeLocation(
      position.coords.latitude,
      position.coords.longitude,
    );

    const location: ActiveLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      label,
    };

    await fetchWeatherForCoordinates(location);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code: unknown }).code === "number"
    ) {
      errorMessage.value = getLocationErrorMessage(error as { code: number });
    } else if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Something went wrong while loading weather.";
    }
  } finally {
    loading.value = false;
  }
}

async function searchWeather() {
  if (!searchQuery.value.trim() && !selectedSuggestion.value) {
    errorMessage.value = "Enter a city or town to search for weather.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    let location: ActiveLocation | null = null;

    if (selectedSuggestion.value) {
      location = {
        latitude: selectedSuggestion.value.latitude,
        longitude: selectedSuggestion.value.longitude,
        label: selectedSuggestion.value.label,
      };
    } else {
      const results = await geocodeLocationsByName(searchQuery.value.trim(), 1);
      const result = results[0];

      if (!result) {
        throw new Error("No matching location found. Try a city and state.");
      }

      location = {
        latitude: result.latitude,
        longitude: result.longitude,
        label: buildLocationLabel(result),
      };
    }

    await fetchWeatherForCoordinates(location);
    searchQuery.value = location.label;
    selectedSuggestion.value = {
      label: location.label,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    searchSuggestions.value = [selectedSuggestion.value];
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Could not load weather for that location.";
    }
  } finally {
    loading.value = false;
  }
}

async function loadWeather() {
  loading.value = true;
  errorMessage.value = "";

  try {
    if (activeLocation.value) {
      await fetchWeatherForCoordinates(activeLocation.value);
      return;
    }

    const position = await getCurrentPosition();
    const label = await reverseGeocodeLocation(
      position.coords.latitude,
      position.coords.longitude,
    );

    const location: ActiveLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      label,
    };

    await fetchWeatherForCoordinates(location);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code: unknown }).code === "number"
    ) {
      errorMessage.value = getLocationErrorMessage(error as { code: number });
    } else if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Something went wrong while loading weather.";
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  void loadCurrentLocationWeather();
});

onBeforeUnmount(() => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
});
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

.activity-section {
  margin-top: 4rem;
}

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

.carousel-section {
  margin-top: 2.5rem;
}

.carousel-card {
  overflow: hidden;
}

.carousel-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  color: #ffffff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0));
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

@media (max-width: 1366px) {
  .activity-section {
    margin-top: 3rem;
  }
}

@media (max-width: 1024px) {
  .weather-search-row {
    grid-template-columns: minmax(220px, 1fr) auto;
  }

  .weather-content {
    min-height: auto;
  }

  .activity-image {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .weather-search-row {
    grid-template-columns: 1fr;
  }

  .activity-section {
    margin-top: 2.5rem;
  }
}

@media (max-width: 760px) {
  .weather-search-row {
    grid-template-columns: 1fr;
  }

  .activity-section {
    margin-top: 2.25rem;
  }

  .activity-image {
    height: 180px;
  }

  .carousel-section {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .activity-image {
    height: 160px;
  }
}
</style>
