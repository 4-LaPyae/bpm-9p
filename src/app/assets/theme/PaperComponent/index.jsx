import { Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(255, 255, 255)",
                    backgroundClip: "border-box",
                    border: "0px solid rgba(0, 0, 0, 0.125)",
                    borderRadius: "1rem",
                    boxShadow: "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem",
                    padding: "5px 25px 25px 25px",
                },
            },
        },
    },
});

export default ({ children, ...other }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box component={Paper} {...other}>
                {children}
            </Box>
        </ThemeProvider>
    );
};
