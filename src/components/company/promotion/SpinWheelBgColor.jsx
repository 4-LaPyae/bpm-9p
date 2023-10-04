import { Stack, Typography } from "@mui/material";
import React from "react";
import ColorPicker from "../../../app/components/colorPicker";

function SpinWheelBgColor({ color, changeColor, side, typography, close }) {
    return (
        <Stack alignItems="center" direction="row" sx={{ height: "100%" }}>
            <ColorPicker
                colorCode={color}
                changeColorCode={changeColor}
                side={side}
                body={true}
                close={close}
            />
            <Typography variant="span" sx={{ ml: 2 }}>
                {typography}
            </Typography>
        </Stack>
    );
}

export default SpinWheelBgColor;
