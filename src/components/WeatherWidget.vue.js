const __VLS_props = defineProps();
const emit = defineEmits();
function formatDateTime(isoTime) {
    const date = new Date(isoTime);
    return date.toLocaleString([], {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "weather-card" },
    elevation: "8",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "weather-card" },
    elevation: "8",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['weather-card']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "d-flex align-center justify-space-between flex-wrap ga-2 weather-title" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "d-flex align-center justify-space-between flex-wrap ga-2 weather-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['weather-title']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center ga-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    icon: "mdi-weather-partly-rainy",
}));
const __VLS_15 = __VLS_14({
    icon: "mdi-weather-partly-rainy",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ 'onClick': {} },
    color: "primary",
    variant: "outlined",
    loading: (__VLS_ctx.loading),
}));
const __VLS_20 = __VLS_19({
    ...{ 'onClick': {} },
    color: "primary",
    variant: "outlined",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('loadWeather');
            // @ts-ignore
            [loading, emit,];
        } });
const { default: __VLS_25 } = __VLS_21.slots;
// @ts-ignore
[];
var __VLS_21;
var __VLS_22;
// @ts-ignore
[];
var __VLS_10;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ class: "weather-content" },
}));
const __VLS_28 = __VLS_27({
    ...{ class: "weather-content" },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
/** @type {__VLS_StyleScopedClasses['weather-content']} */ ;
const { default: __VLS_31 } = __VLS_29.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "weather-search-row" },
});
/** @type {__VLS_StyleScopedClasses['weather-search-row']} */ ;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.vAutocomplete | typeof __VLS_components.VAutocomplete | typeof __VLS_components['v-autocomplete']} */
vAutocomplete;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    ...{ 'onUpdate:search': {} },
    ...{ 'onUpdate:modelValue': {} },
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.selectedSuggestion),
    search: (__VLS_ctx.searchQuery),
    items: (__VLS_ctx.searchSuggestions),
    itemTitle: "label",
    itemValue: "label",
    returnObject: true,
    label: "Search city or state",
    placeholder: "Start typing (example: Little Rock, Arkansas)",
    variant: "outlined",
    density: "comfortable",
    hideDetails: true,
    clearable: true,
    loading: (__VLS_ctx.searchingLocations),
    noDataText: "No location matches yet",
    ...{ class: "weather-search-input" },
}));
const __VLS_34 = __VLS_33({
    ...{ 'onUpdate:search': {} },
    ...{ 'onUpdate:modelValue': {} },
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.selectedSuggestion),
    search: (__VLS_ctx.searchQuery),
    items: (__VLS_ctx.searchSuggestions),
    itemTitle: "label",
    itemValue: "label",
    returnObject: true,
    label: "Search city or state",
    placeholder: "Start typing (example: Little Rock, Arkansas)",
    variant: "outlined",
    density: "comfortable",
    hideDetails: true,
    clearable: true,
    loading: (__VLS_ctx.searchingLocations),
    noDataText: "No location matches yet",
    ...{ class: "weather-search-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
const __VLS_38 = ({ 'update:search': {} },
    { 'onUpdate:search': (...[$event]) => {
            __VLS_ctx.emit('onSearchInput', $event);
            // @ts-ignore
            [emit, selectedSuggestion, searchQuery, searchSuggestions, searchingLocations,];
        } });
const __VLS_39 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.emit('onSuggestionSelected', $event);
            // @ts-ignore
            [emit,];
        } });
const __VLS_40 = ({ keyup: {} },
    { onKeyup: (...[$event]) => {
            __VLS_ctx.emit('searchWeather');
            // @ts-ignore
            [emit,];
        } });
/** @type {__VLS_StyleScopedClasses['weather-search-input']} */ ;
var __VLS_35;
var __VLS_36;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    ...{ 'onClick': {} },
    color: "secondary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_43 = __VLS_42({
    ...{ 'onClick': {} },
    color: "secondary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_46;
const __VLS_47 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('searchWeather');
            // @ts-ignore
            [loading, emit,];
        } });
const { default: __VLS_48 } = __VLS_44.slots;
// @ts-ignore
[];
var __VLS_44;
var __VLS_45;
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    ...{ 'onClick': {} },
    variant: "tonal",
    loading: (__VLS_ctx.loading),
}));
const __VLS_51 = __VLS_50({
    ...{ 'onClick': {} },
    variant: "tonal",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_54;
const __VLS_55 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('loadCurrentLocationWeather');
            // @ts-ignore
            [loading, emit,];
        } });
const { default: __VLS_56 } = __VLS_52.slots;
// @ts-ignore
[];
var __VLS_52;
var __VLS_53;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
}
else if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    (__VLS_ctx.errorMessage);
}
else if (__VLS_ctx.weather) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "weather-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-grid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "weather-summary" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-summary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "weather-temp" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-temp']} */ ;
    (__VLS_ctx.weather.temperature);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "weather-condition" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-condition']} */ ;
    (__VLS_ctx.weather.condition);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "weather-location" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-location']} */ ;
    (__VLS_ctx.weather.locationLabel);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "weather-updated" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-updated']} */ ;
    (__VLS_ctx.formatDateTime(__VLS_ctx.weather.time));
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "weather-coords" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-coords']} */ ;
    (__VLS_ctx.weather.latitude.toFixed(3));
    (__VLS_ctx.weather.longitude.toFixed(3));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "weather-metrics" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-metrics']} */ ;
    let __VLS_57;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }));
    const __VLS_59 = __VLS_58({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    /** @type {__VLS_StyleScopedClasses['ma-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['metrics-chip']} */ ;
    const { default: __VLS_62 } = __VLS_60.slots;
    (__VLS_ctx.weather.windSpeed);
    // @ts-ignore
    [loading, errorMessage, errorMessage, weather, weather, weather, weather, weather, weather, weather, weather, formatDateTime,];
    var __VLS_60;
    let __VLS_63;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }));
    const __VLS_65 = __VLS_64({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    /** @type {__VLS_StyleScopedClasses['ma-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['metrics-chip']} */ ;
    const { default: __VLS_68 } = __VLS_66.slots;
    (__VLS_ctx.weather.rainNow);
    // @ts-ignore
    [weather,];
    var __VLS_66;
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }));
    const __VLS_71 = __VLS_70({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    /** @type {__VLS_StyleScopedClasses['ma-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['metrics-chip']} */ ;
    const { default: __VLS_74 } = __VLS_72.slots;
    (__VLS_ctx.weather.rainChanceNext6h);
    // @ts-ignore
    [weather,];
    var __VLS_72;
    let __VLS_75;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }));
    const __VLS_77 = __VLS_76({
        ...{ class: "ma-1 metrics-chip" },
        label: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    /** @type {__VLS_StyleScopedClasses['ma-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['metrics-chip']} */ ;
    const { default: __VLS_80 } = __VLS_78.slots;
    (__VLS_ctx.weather.rainTotalNext12h);
    // @ts-ignore
    [weather,];
    var __VLS_78;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "weather-outdoor" },
    });
    /** @type {__VLS_StyleScopedClasses['weather-outdoor']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "advice-title" },
    });
    /** @type {__VLS_StyleScopedClasses['advice-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.weather.outdoorAdvice);
    if (__VLS_ctx.weather.rainRiskLevel === 'high') {
        let __VLS_81;
        /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
        vAlert;
        // @ts-ignore
        const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
            type: "warning",
            variant: "tonal",
            density: "comfortable",
            ...{ class: "mt-3" },
        }));
        const __VLS_83 = __VLS_82({
            type: "warning",
            variant: "tonal",
            density: "comfortable",
            ...{ class: "mt-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
        const { default: __VLS_86 } = __VLS_84.slots;
        // @ts-ignore
        [weather, weather,];
        var __VLS_84;
    }
    else if (__VLS_ctx.weather.rainRiskLevel === 'medium') {
        let __VLS_87;
        /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
        vAlert;
        // @ts-ignore
        const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
            type: "info",
            variant: "tonal",
            density: "comfortable",
            ...{ class: "mt-3" },
        }));
        const __VLS_89 = __VLS_88({
            type: "info",
            variant: "tonal",
            density: "comfortable",
            ...{ class: "mt-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_88));
        /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
        const { default: __VLS_92 } = __VLS_90.slots;
        // @ts-ignore
        [weather,];
        var __VLS_90;
    }
    else {
        let __VLS_93;
        /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
        vAlert;
        // @ts-ignore
        const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
            type: "success",
            variant: "tonal",
            density: "comfortable",
            ...{ class: "mt-3" },
        }));
        const __VLS_95 = __VLS_94({
            type: "success",
            variant: "tonal",
            density: "comfortable",
            ...{ class: "mt-3" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_94));
        /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
        const { default: __VLS_98 } = __VLS_96.slots;
        // @ts-ignore
        [];
        var __VLS_96;
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
}
// @ts-ignore
[];
var __VLS_29;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
