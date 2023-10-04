import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import pxToRem from "../../../helper/pxToRem";

export default styled(Button)(({ theme, ownerState }) => {
    const { palette } = theme;
    let { mkcolor, variant, size, icon, textTransform } = ownerState;
    const paddingValue =
        size === "small"
            ? `${pxToRem(8)} ${pxToRem(24)}`
            : `${pxToRem(12)} ${pxToRem(24)}`;
    textTransform = textTransform === "capitalize" ? "capitalize" : "uppercase";

    const containedStyles = () => {
        const backgroundValue = palette[mkcolor]?.main || mkcolor;
        const colorValue = palette["white"].main;
        return {
            background: backgroundValue,
            color: colorValue,
            padding: paddingValue,
            textTransform: textTransform,
            "&:hover": {
                background: backgroundValue,
                color: colorValue,
            },
            "&:focus:not(:hover)": {
                background: backgroundValue,
                // boxShadow: boxShadowValue,
            },
        };
    };

    const outlinedStyles = () => {
        const colorValue = palette[mkcolor]?.main || mkcolor;
        const backgroundValue = palette["white"].main;
        return {
            background: backgroundValue,
            color: colorValue,
            padding: paddingValue,
            textTransform: textTransform,
            border: `1.4px solid ${colorValue}`,
            "&:hover": {
                background: backgroundValue,
                color: colorValue,
                border: `1.4px solid ${colorValue}`,
            },
            "&:focus:not(:hover)": {
                background: backgroundValue,
                // boxShadow: boxShadowValue,
            },
        };
    };

    const gradientStyles = () => {
        const backgroundValue = mkcolor;
        const colorValue = palette["white"].main;
        return {
            backgroundImage: backgroundValue,
            color: colorValue,
            padding: paddingValue,
            textTransform: textTransform,
            "&:hover": {
                backgroundImage: backgroundValue,
                color: colorValue,
            },
            "&:focus:not(:hover)": {
                backgroundImage: backgroundValue,
                // boxShadow: boxShadowValue,
            },
        };
    };

    const iconStyles = () => {
        const backgroundValue = palette[mkcolor]?.main || mkcolor;
        const colorValue = palette["white"].main;
        return {
            backgroundColor: backgroundValue,
            color: colorValue,
            textTransform: textTransform,
            padding: `${pxToRem(6)} ${pxToRem(12)}`,
            "&:hover": {
                backgroundColor: backgroundValue,
                color: colorValue,
            },
            "&:focus:not(:hover)": {
                backgroundImage: backgroundValue,
                // boxShadow: boxShadowValue,
            },
        };
    };

    return {
        ...(variant === "contained" && containedStyles()),
        ...(variant === "outlined" && outlinedStyles()),
        ...(variant === "gradient" && gradientStyles()),
        ...(icon === "icon" && iconStyles()),
    };
});
