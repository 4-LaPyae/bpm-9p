import { styled } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";

export default styled(Autocomplete)(({ theme, ownerState }) => {
    const { fullWidth } = ownerState;
    return {
        width: fullWidth ? "100%" : 340,
        "& .MuiInputBase-input ": {
            fontSize: "14px",
        },
        "& .MuiOutlinedInput-root.MuiInputBase-root": {
            padding: "8px 0px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderRadius: "0.5rem",
            borderColor: "#d2d6da",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#35d1f5 ",
            },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#35d1f5",
            },
    };
});
