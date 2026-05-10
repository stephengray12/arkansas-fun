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
const loading = ref(false);
const errorMessage = ref("");
const weather = ref(null);
const searchQuery = ref("");
const searchSuggestions = ref([]);
const selectedSuggestion = ref(null);
const searchingLocations = ref(false);
const activeLocation = ref(null);
let searchDebounceTimer = null;
let searchRequestSerial = 0;
const weatherCodeMap = {
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
function getCurrentPosition() {
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
function buildOutdoorAdvice(weather) {
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
function getRainRiskLevel(rainChanceNext6h) {
    if (rainChanceNext6h <= 20) {
        return "low";
    }
    if (rainChanceNext6h <= 29) {
        return "medium";
    }
    return "high";
}
function buildLocationLabel(result) {
    const primaryParts = [result.name, result.admin1].filter(Boolean);
    if (primaryParts.length > 0) {
        return primaryParts.join(", ");
    }
    return result.country ?? "Selected location";
}
function buildSuggestionLabel(result) {
    const labelParts = [result.name, result.admin1, result.country].filter(Boolean);
    if (labelParts.length > 0) {
        return labelParts.join(", ");
    }
    return "Unknown location";
}
async function geocodeLocationsByName(name, count = 8) {
    const geocodeResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=${count}&language=en&format=json`);
    if (!geocodeResponse.ok) {
        throw new Error("Unable to search that location right now.");
    }
    const geocodeData = await geocodeResponse.json();
    return geocodeData.results ?? [];
}
function onSuggestionSelected(value) {
    selectedSuggestion.value = value;
    if (value) {
        searchQuery.value = value.label;
    }
}
function onSearchInput(value) {
    if (!value.trim()) {
        searchSuggestions.value = [];
        return;
    }
    if (selectedSuggestion.value &&
        value.trim() !== selectedSuggestion.value.label) {
        selectedSuggestion.value = null;
    }
    if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
    }
    searchDebounceTimer = setTimeout(() => {
        void loadSearchSuggestions(value);
    }, 300);
}
async function loadSearchSuggestions(rawQuery) {
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
        searchSuggestions.value = results.map((result) => ({
            label: buildSuggestionLabel(result),
            latitude: result.latitude,
            longitude: result.longitude,
        }));
    }
    catch {
        if (requestId === searchRequestSerial) {
            searchSuggestions.value = [];
        }
    }
    finally {
        if (requestId === searchRequestSerial) {
            searchingLocations.value = false;
        }
    }
}
async function reverseGeocodeLocation(latitude, longitude) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`);
        if (!response.ok) {
            return "Your current location";
        }
        const data = await response.json();
        const result = data.results?.[0];
        if (!result) {
            return "Your current location";
        }
        return buildLocationLabel(result);
    }
    catch {
        return "Your current location";
    }
}
async function fetchWeatherForCoordinates(location) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m,rain&hourly=precipitation_probability,precipitation&forecast_hours=12&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data (status ${response.status}).`);
    }
    const data = await response.json();
    const current = data.current;
    const rainChanceHourly = data.hourly?.precipitation_probability ?? [];
    const rainHourly = data.hourly?.precipitation ?? [];
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
function getLocationErrorMessage(error) {
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
        const label = await reverseGeocodeLocation(position.coords.latitude, position.coords.longitude);
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            label,
        };
        await fetchWeatherForCoordinates(location);
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            typeof error.code === "number") {
            errorMessage.value = getLocationErrorMessage(error);
        }
        else if (error instanceof Error) {
            errorMessage.value = error.message;
        }
        else {
            errorMessage.value = "Something went wrong while loading weather.";
        }
    }
    finally {
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
        let location = null;
        if (selectedSuggestion.value) {
            location = {
                latitude: selectedSuggestion.value.latitude,
                longitude: selectedSuggestion.value.longitude,
                label: selectedSuggestion.value.label,
            };
        }
        else {
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
    }
    catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message;
        }
        else {
            errorMessage.value = "Could not load weather for that location.";
        }
    }
    finally {
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
        const label = await reverseGeocodeLocation(position.coords.latitude, position.coords.longitude);
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            label,
        };
        await fetchWeatherForCoordinates(location);
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            typeof error.code === "number") {
            errorMessage.value = getLocationErrorMessage(error);
        }
        else if (error instanceof Error) {
            errorMessage.value = error.message;
        }
        else {
            errorMessage.value = "Something went wrong while loading weather.";
        }
    }
    finally {
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
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['activity-section']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-search-row']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-content']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-image']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-search-row']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-section']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-search-row']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-section']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-image']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-image']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "mb-6" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "mb-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    cols: "12",
}));
const __VLS_15 = __VLS_14({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
const __VLS_19 = WeatherWidget;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ 'onOnSearchInput': {} },
    ...{ 'onOnSuggestionSelected': {} },
    ...{ 'onSearchWeather': {} },
    ...{ 'onLoadCurrentLocationWeather': {} },
    ...{ 'onLoadWeather': {} },
    weather: (__VLS_ctx.weather),
    loading: (__VLS_ctx.loading),
    errorMessage: (__VLS_ctx.errorMessage),
    searchQuery: (__VLS_ctx.searchQuery),
    searchSuggestions: (__VLS_ctx.searchSuggestions),
    selectedSuggestion: (__VLS_ctx.selectedSuggestion),
    searchingLocations: (__VLS_ctx.searchingLocations),
}));
const __VLS_21 = __VLS_20({
    ...{ 'onOnSearchInput': {} },
    ...{ 'onOnSuggestionSelected': {} },
    ...{ 'onSearchWeather': {} },
    ...{ 'onLoadCurrentLocationWeather': {} },
    ...{ 'onLoadWeather': {} },
    weather: (__VLS_ctx.weather),
    loading: (__VLS_ctx.loading),
    errorMessage: (__VLS_ctx.errorMessage),
    searchQuery: (__VLS_ctx.searchQuery),
    searchSuggestions: (__VLS_ctx.searchSuggestions),
    selectedSuggestion: (__VLS_ctx.selectedSuggestion),
    searchingLocations: (__VLS_ctx.searchingLocations),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
const __VLS_25 = ({ onSearchInput: {} },
    { onOnSearchInput: (__VLS_ctx.onSearchInput) });
const __VLS_26 = ({ onSuggestionSelected: {} },
    { onOnSuggestionSelected: (__VLS_ctx.onSuggestionSelected) });
const __VLS_27 = ({ searchWeather: {} },
    { onSearchWeather: (__VLS_ctx.searchWeather) });
const __VLS_28 = ({ loadCurrentLocationWeather: {} },
    { onLoadCurrentLocationWeather: (__VLS_ctx.loadCurrentLocationWeather) });
const __VLS_29 = ({ loadWeather: {} },
    { onLoadWeather: (__VLS_ctx.loadWeather) });
var __VLS_22;
var __VLS_23;
// @ts-ignore
[weather, loading, errorMessage, searchQuery, searchSuggestions, selectedSuggestion, searchingLocations, onSearchInput, onSuggestionSelected, searchWeather, loadCurrentLocationWeather, loadWeather,];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    ...{ class: "activity-section" },
    align: "stretch",
}));
const __VLS_32 = __VLS_31({
    ...{ class: "activity-section" },
    align: "stretch",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['activity-section']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    cols: "12",
    sm: "6",
    md: "4",
    ...{ class: "d-flex" },
}));
const __VLS_38 = __VLS_37({
    cols: "12",
    sm: "6",
    md: "4",
    ...{ class: "d-flex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
const __VLS_42 = ActivityCard;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    title: "Fishing",
    image: (__VLS_ctx.fishingImage),
    description: "The Natural state has a great reputation for bass, trout, catfish and crappie fishing. Start with the White River! With its guided trout fishing tours, you'll have an unforgettable experience.",
}));
const __VLS_44 = __VLS_43({
    title: "Fishing",
    image: (__VLS_ctx.fishingImage),
    description: "The Natural state has a great reputation for bass, trout, catfish and crappie fishing. Start with the White River! With its guided trout fishing tours, you'll have an unforgettable experience.",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
// @ts-ignore
[fishingImage,];
var __VLS_39;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    cols: "12",
    sm: "6",
    md: "4",
    ...{ class: "d-flex" },
}));
const __VLS_49 = __VLS_48({
    cols: "12",
    sm: "6",
    md: "4",
    ...{ class: "d-flex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
const { default: __VLS_52 } = __VLS_50.slots;
const __VLS_53 = ActivityCard;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    title: "Hiking",
    image: (__VLS_ctx.hikingImage),
    description: "Explore some of the best hiking around! From Mount Magazine to Pinnacle Mountain, we have some of the best trails and scenic views in the state.",
}));
const __VLS_55 = __VLS_54({
    title: "Hiking",
    image: (__VLS_ctx.hikingImage),
    description: "Explore some of the best hiking around! From Mount Magazine to Pinnacle Mountain, we have some of the best trails and scenic views in the state.",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
// @ts-ignore
[hikingImage,];
var __VLS_50;
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    cols: "12",
    sm: "6",
    md: "4",
    ...{ class: "d-flex" },
}));
const __VLS_60 = __VLS_59({
    cols: "12",
    sm: "6",
    md: "4",
    ...{ class: "d-flex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
const { default: __VLS_63 } = __VLS_61.slots;
const __VLS_64 = ActivityCard;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    title: "Hunting",
    image: (__VLS_ctx.huntingImage),
    description: "Arkansas is known for its abundant wildlife. We have a great reputation for white tail deer, turkey, and are known for the best duck hunting in the world.",
}));
const __VLS_66 = __VLS_65({
    title: "Hunting",
    image: (__VLS_ctx.huntingImage),
    description: "Arkansas is known for its abundant wildlife. We have a great reputation for white tail deer, turkey, and are known for the best duck hunting in the world.",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
// @ts-ignore
[huntingImage,];
var __VLS_61;
// @ts-ignore
[];
var __VLS_33;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    ...{ class: "carousel-section" },
    justify: "center",
}));
const __VLS_71 = __VLS_70({
    ...{ class: "carousel-section" },
    justify: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
/** @type {__VLS_StyleScopedClasses['carousel-section']} */ ;
const { default: __VLS_74 } = __VLS_72.slots;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    cols: "12",
}));
const __VLS_77 = __VLS_76({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ class: "carousel-card" },
    elevation: "8",
    rounded: "xl",
}));
const __VLS_83 = __VLS_82({
    ...{ class: "carousel-card" },
    elevation: "8",
    rounded: "xl",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['carousel-card']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    ...{ class: "text-h5 font-weight-bold pb-1" },
}));
const __VLS_89 = __VLS_88({
    ...{ class: "text-h5 font-weight-bold pb-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-1']} */ ;
const { default: __VLS_92 } = __VLS_90.slots;
// @ts-ignore
[];
var __VLS_90;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.vCardSubtitle | typeof __VLS_components.VCardSubtitle | typeof __VLS_components['v-card-subtitle'] | typeof __VLS_components.vCardSubtitle | typeof __VLS_components.VCardSubtitle | typeof __VLS_components['v-card-subtitle']} */
vCardSubtitle;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ class: "pb-4" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "pb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
// @ts-ignore
[];
var __VLS_96;
const __VLS_99 = ImageCarousel;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    images: (__VLS_ctx.arkansasCarouselSlides),
}));
const __VLS_101 = __VLS_100({
    images: (__VLS_ctx.arkansasCarouselSlides),
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
// @ts-ignore
[arkansasCarouselSlides,];
var __VLS_84;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_72;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
