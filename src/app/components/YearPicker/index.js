import {
    OutlinedInput, TextField,
} from "@mui/material";
import { forwardRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";



// export default const  YearPicker = () => {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//                 views={["year"]}
//                 value={releaseYear}
//                 onChange={(newValue) => {
//                     setReleaseYear(newValue);
//                     // console.log(newValue.$y);
//                 }}
//                 renderInput={(params) => (
//                     <TextField {...params} helperText={null} />
//                 )}

//             />
//         </LocalizationProvider>
//     );

// }

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
                    padding: "11px 10px",
                    fontSize: "14px"
                },
            },
        },
    },
});

const YearPicker = forwardRef(
    ({ placeholder, required = false, ...rest }, ref) => {
        return (
            <ThemeProvider theme={dateTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        ref={ref}
                        {...rest}
                        renderInput={(params) => {
                            const { inputProps, ...rest } = params;
                            const tt = { ...inputProps, placeholder: placeholder };
                            return <TextField
                                {...tt}{...rest}
                                sx={{ width: "100%" }} />

                        }}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        );
    }
);

export default YearPicker;