// Soft UI Dashboard React Helper Functions
import pxToRem from "../../helper/pxToRem";

const baseProperties = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontSizeXXS: pxToRem(10.4),
    fontSizeXS: pxToRem(13),
    fontSizeSM: pxToRem(15),
    fontSizeMD: pxToRem(17),
    fontSizeLG: pxToRem(19),
    fontSizeXL: pxToRem(21),

    // fontSizeXS: pxToRem(12),
    // fontSizeSM: pxToRem(14),
    // fontSizeMD: pxToRem(16),
    // fontSizeLG: pxToRem(18),
    // fontSizeXL: pxToRem(20),
};

const baseHeadingProperties = {
    fontFamily: baseProperties.fontFamily,
    color: "#1e2532",
    fontWeight: baseProperties.fontWeightMedium,
};

const baseDisplayProperties = {
    fontFamily: baseProperties.fontFamily,
    color: "#344767",
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.2,
};

const typography = {
    fontFamily: baseProperties.fontFamily,
    fontWeightLight: baseProperties.fontWeightLight,
    fontWeightRegular: baseProperties.fontWeightRegular,
    fontWeightMedium: baseProperties.fontWeightMedium,
    fontWeightBold: baseProperties.fontWeightBold,

    // title 1
    h1: {
        // fontSize: pxToRem(48),
        fontSize: baseProperties.fontSizeXL,
        fontWeight: baseProperties.fontWeightBold,
        lineHeight: 1.25,
        ...baseHeadingProperties,
    },

    // title 2
    h2: {
        // fontSize: pxToRem(36),
        fontSize: baseProperties.fontSizeLG,
        fontWeight: baseProperties.fontWeightBold,
        lineHeight: 1.3,
        ...baseHeadingProperties,
    },

    h3: {
        // fontSize: pxToRem(30),
        fontSize: baseProperties.fontSizeMD,
        lineHeight: 1.375,
        ...baseHeadingProperties,
    },

    h4: {
        // fontSize: pxToRem(24),
        fontSize: baseProperties.fontSizeSM,
        lineHeight: 1.375,
        ...baseHeadingProperties,
    },

    h5: {
        // fontSize: pxToRem(20),
        fontSize: baseProperties.fontSizeXS,
        lineHeight: 1.375,
        ...baseHeadingProperties,
    },

    h6: {
        fontSize: baseProperties.fontSizeXXS,
        lineHeight: 1.625,
        ...baseHeadingProperties,
    },

    subtitle1: {
        fontFamily: baseProperties.fontFamily,
        fontSize: baseProperties.fontSizeMD,
        fontWeight: baseProperties.fontWeightMedium,
        color: "#1e2532",
        lineHeight: 1.625,
    },

    subtitle2: {
        fontFamily: baseProperties.fontFamily,
        fontSize: baseProperties.fontSizeSM,
        fontWeight: baseProperties.fontWeightRegular,
        color: "#1e2532",
        lineHeight: 1.6,
    },

    caption: {
        fontFamily: baseProperties.fontFamily,
        fontSize: baseProperties.fontSizeXS,
        fontWeight: baseProperties.fontWeightRegular,
        lineHeight: 1.25,
        color: "#1e2532",
    },

    body1: {
        fontFamily: baseProperties.fontFamily,
        fontSize: pxToRem(14.5),
        fontWeight: baseProperties.fontWeightRegular,
        lineHeight: 1.625,
    },

    body2: {
        fontFamily: baseProperties.fontFamily,
        fontSize: pxToRem(13.5),
        fontWeight: baseProperties.fontWeightRegular,
        lineHeight: 1.6,
    },

    button: {
        fontFamily: baseProperties.fontFamily,
        fontSize: baseProperties.fontSizeXS,
        fontWeight: baseProperties.fontWeightRegular,
        lineHeight: 1.25,
    },

    overline: {
        fontFamily: baseProperties.fontFamily,
    },

    // d1: {
    //     fontSize: pxToRem(80),
    //     ...baseDisplayProperties,
    // },

    // d2: {
    //     fontSize: pxToRem(72),
    //     ...baseDisplayProperties,
    // },

    // d3: {
    //     fontSize: pxToRem(64),
    //     ...baseDisplayProperties,
    // },

    // d4: {
    //     fontSize: pxToRem(56),
    //     ...baseDisplayProperties,
    // },

    // d5: {
    //     fontSize: pxToRem(48),
    //     ...baseDisplayProperties,
    // },

    // d6: {
    //     fontSize: pxToRem(40),
    //     ...baseDisplayProperties,
    // },

    // size: {
    //     xxs: baseProperties.fontSizeXXS,
    //     xs: baseProperties.fontSizeXS,
    //     sm: baseProperties.fontSizeSM,
    //     md: baseProperties.fontSizeMD,
    //     lg: baseProperties.fontSizeLG,
    //     xl: baseProperties.fontSizeXL,
    // },

    fontSizeXXS: { fontSize: baseProperties.fontSizeXXS },
    fontSizeXS: { fontSize: baseProperties.fontSizeXS },
    fontSizeSM: { fontSize: baseProperties.fontSizeSM },
    fontSizeMD: { fontSize: baseProperties.fontSizeMD },
    fontSizeLG: { fontSize: baseProperties.fontSizeLG },
    fontSizeXL: { fontSize: baseProperties.fontSizeXL },

    // lineHeight: {
    //     sm: 1.25,
    //     md: 1.5,
    //     lg: 2,
    // },

    lineHeightSM: { lineHeight: 1.25 },
    lineHeightMD: { lineHeight: 1.5 },
    lineHeightLG: { lineHeight: 2 },
};

export default typography;
