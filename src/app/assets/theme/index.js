import {
    createTheme,
    experimental_sx as sx,
} from "@mui/material/styles";
import pxToRem from "../../helper/pxToRem";
import colors from "./color";
import globals from "./globals";
import typography from "./typography";
import borders from "./borders";
export default createTheme({
    palette: { ...colors },
    typography: { ...typography },
    borders: { ...borders },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ...globals,
            },
        },
        MuiInputBase: {
            defaultProps: {
                size: "small",
            },
            styleOverrides: {
                root: sx({
                    borderRadius: pxToRem(8),
                    padding: "4px 8px",
                    fontSize: pxToRem(14),
                    backgroundColor: "#fff",
                }),
                input: sx({
                    padding: "5px",
                    "&:focus": sx({
                        backgroundColor: "#fff !important",
                    }),
                }),
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                option: sx({
                    fontSize: "16px",
                }),
            },
        },
        MuiListSubheader: {
            styleOverrides: {
                root: sx({
                    backgroundColor: "#F6F8F9 !important",
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: sx({
                    fontSize: pxToRem(16),
                }),
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },

            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "0px solid rgba(0, 0, 0, 0.125)",
                    boxShadow:
                        "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: "0",
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    borderRadius: "17px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: pxToRem(14),
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: sx({
                    padding: "12px 24px",
                    borderRadius: pxToRem(8),
                }),
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: sx({
                    "&:hover": {
                        backgroundColor: "transparent !important",
                    },
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                sizeSmall: {
                    borderRadius: pxToRem(12),
                },
                sizeMedium: {
                    height: "26px",
                    lineHeight: " 1.5",
                    borderRadius: pxToRem(12),
                },
                labelMedium: {
                    padding: "0.75em 1em 0.65em",
                    fontWeight: "bold",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: "10px",
                },
            },
        },
    },
});
