import { InputBase, Autocomplete, TextField } from "@mui/material";
import { forwardRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const dateTheme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#35d1f5 ",
                        },
                    },
                    "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#35d1f5",
                        },
                    },
                    "&.Mui-error": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#d32f2f",
                        },
                    },
                },
                notchedOutline: {
                    borderWidth: 2,
                    borderRadius: "0.5rem",
                    borderColor: "#d2d6da",
                },
                input: {
                    padding: "11px 13px",
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#0fbfe8 !important",
                    },
                },
            },
        },
    },
});

const MkDataPicker = forwardRef(
    ({ placeholder, name = "", fullWidth = false, required = false, ...rest }, ref) => {
        // const [error, setError] = useState(null);

        return (
            <ThemeProvider theme={dateTheme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        ref={ref}
                        label=""
                        {...rest}
                        // renderInput={(params) => (
                        //     <TextField
                        //         {...params}
                        //         required={required}
                        //         sx={{ width: "100%" }}
                        //         name={name}
                        //     />
                        // )}
                        renderInput={(params) => {
                            const { inputProps, ...rest } = params;
                            const tt = { ...inputProps, placeholder: placeholder };
                            return <TextField
                                {...tt}{...rest}
                                sx={{ width: "100%" }}
                                name={name}
                            />

                        }}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        );
    }
);

export default MkDataPicker;
