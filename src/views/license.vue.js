const licenseCards = [
    {
        title: "Buy A License or Permit",
        description: "Go directly to the official AGFC purchasing portal to buy your license or permit.",
        url: "https://ar-licensing.s3licensing.com/",
        icon: "mdi-card-account-details-outline",
    },
    {
        title: "Fishing Licenses",
        description: "Review fishing license types, eligibility, and fees for Arkansas anglers.",
        url: "https://www.agfc.com/resources/licensing/fishing-license-descriptions-and-fees/",
        icon: "mdi-fish",
    },
    {
        title: "Hunting Licenses",
        description: "Find hunting license descriptions and pricing for residents and non-residents.",
        url: "https://www.agfc.com/resources/licensing/hunting-license-descriptions-and-fees/",
        icon: "mdi-bow-arrow",
    },
    {
        title: "Special & Lifetime Licenses",
        description: "Access disability, mobility-impaired, 65-plus, military retiree, and lifetime options.",
        url: "https://www.agfc.com/resources/licensing/disability-mobility-impaired-65-plus-military-retiree-lifetime-licenses/",
        icon: "mdi-shield-account-outline",
    },
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['license-card']} */ ;
/** @type {__VLS_StyleScopedClasses['license-page']} */ ;
/** @type {__VLS_StyleScopedClasses['license-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['license-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['license-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card-cell']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "license-page py-8" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "license-page py-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['license-page']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    justify: "center",
    ...{ class: "mb-6" },
}));
const __VLS_9 = __VLS_8({
    justify: "center",
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
    md: "10",
    lg: "9",
}));
const __VLS_15 = __VLS_14({
    cols: "12",
    md: "10",
    lg: "9",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-h4 font-weight-bold mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-subtitle-1 mb-0" },
});
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
var __VLS_16;
var __VLS_10;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    justify: "center",
    align: "stretch",
    ...{ class: "license-grid" },
}));
const __VLS_21 = __VLS_20({
    justify: "center",
    align: "stretch",
    ...{ class: "license-grid" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['license-grid']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
for (const [license] of __VLS_vFor((__VLS_ctx.licenseCards))) {
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
    vCol;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        key: (license.title),
        cols: "12",
        md: "6",
        ...{ class: "license-col d-flex card-cell" },
    }));
    const __VLS_27 = __VLS_26({
        key: (license.title),
        cols: "12",
        md: "6",
        ...{ class: "license-col d-flex card-cell" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    /** @type {__VLS_StyleScopedClasses['license-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['card-cell']} */ ;
    const { default: __VLS_30 } = __VLS_28.slots;
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
    vCard;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        ...{ class: "license-card h-100" },
        elevation: "8",
        rounded: "xl",
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: "license-card h-100" },
        elevation: "8",
        rounded: "xl",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    /** @type {__VLS_StyleScopedClasses['license-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-100']} */ ;
    const { default: __VLS_36 } = __VLS_34.slots;
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.vCardItem | typeof __VLS_components.VCardItem | typeof __VLS_components['v-card-item'] | typeof __VLS_components.vCardItem | typeof __VLS_components.VCardItem | typeof __VLS_components['v-card-item']} */
    vCardItem;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        ...{ class: "pt-6 px-6" },
    }));
    const __VLS_39 = __VLS_38({
        ...{ class: "pt-6 px-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    /** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    const { default: __VLS_42 } = __VLS_40.slots;
    {
        const { prepend: __VLS_43 } = __VLS_40.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "icon-wrap" },
        });
        /** @type {__VLS_StyleScopedClasses['icon-wrap']} */ ;
        let __VLS_44;
        /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
        vIcon;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
            icon: (license.icon),
            size: "26",
            color: "primary",
        }));
        const __VLS_46 = __VLS_45({
            icon: (license.icon),
            size: "26",
            color: "primary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        // @ts-ignore
        [licenseCards,];
    }
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
    vCardTitle;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        ...{ class: "text-h6 font-weight-bold card-title" },
    }));
    const __VLS_51 = __VLS_50({
        ...{ class: "text-h6 font-weight-bold card-title" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    /** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
    const { default: __VLS_54 } = __VLS_52.slots;
    (license.title);
    // @ts-ignore
    [];
    var __VLS_52;
    // @ts-ignore
    [];
    var __VLS_40;
    let __VLS_55;
    /** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
    vCardText;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
        ...{ class: "px-6 text-body-1 card-copy" },
    }));
    const __VLS_57 = __VLS_56({
        ...{ class: "px-6 text-body-1 card-copy" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['card-copy']} */ ;
    const { default: __VLS_60 } = __VLS_58.slots;
    (license.description);
    // @ts-ignore
    [];
    var __VLS_58;
    let __VLS_61;
    /** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
    vCardActions;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
        ...{ class: "px-6 pb-6 card-actions" },
    }));
    const __VLS_63 = __VLS_62({
        ...{ class: "px-6 pb-6 card-actions" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
    const { default: __VLS_66 } = __VLS_64.slots;
    let __VLS_67;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
        color: "primary",
        variant: "elevated",
        size: "large",
        block: true,
        href: (license.url),
        target: "_blank",
        rel: "noopener noreferrer",
        appendIcon: "mdi-open-in-new",
    }));
    const __VLS_69 = __VLS_68({
        color: "primary",
        variant: "elevated",
        size: "large",
        block: true,
        href: (license.url),
        target: "_blank",
        rel: "noopener noreferrer",
        appendIcon: "mdi-open-in-new",
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    const { default: __VLS_72 } = __VLS_70.slots;
    // @ts-ignore
    [];
    var __VLS_70;
    // @ts-ignore
    [];
    var __VLS_64;
    // @ts-ignore
    [];
    var __VLS_34;
    // @ts-ignore
    [];
    var __VLS_28;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_22;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    justify: "center",
    ...{ class: "mt-4" },
}));
const __VLS_75 = __VLS_74({
    justify: "center",
    ...{ class: "mt-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
const { default: __VLS_78 } = __VLS_76.slots;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    cols: "12",
    md: "10",
    lg: "9",
}));
const __VLS_81 = __VLS_80({
    cols: "12",
    md: "10",
    lg: "9",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
const { default: __VLS_84 } = __VLS_82.slots;
let __VLS_85;
/** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
vAlert;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
    type: "info",
    variant: "tonal",
    density: "comfortable",
}));
const __VLS_87 = __VLS_86({
    type: "info",
    variant: "tonal",
    density: "comfortable",
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
const { default: __VLS_90 } = __VLS_88.slots;
// @ts-ignore
[];
var __VLS_88;
// @ts-ignore
[];
var __VLS_82;
// @ts-ignore
[];
var __VLS_76;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
