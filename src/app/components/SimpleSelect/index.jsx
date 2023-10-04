import {
    Box,
    FormControl,
    ListSubheader,
    makeStyles,
    MenuItem,
    Select,
    styled,
} from "@mui/material";
import * as React from "react";

const MKSelect = styled(Select)(({ theme, ownerState }) => {
    return {
        width: "100%",
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderRadius: "0.5rem",
            borderColor: "#d2d6da",
        },
        "&.Mui-focused fieldset": {
            border: "#35d1f5 solid 2px !important",
            boxShadow: "0 0 1px 2px #81e3f9de !important",
        },
        // "& .MuiOutlinedInput-notchedOutline": {
        //     border: "#35d1f5 solid 2px !important",
        //     boxShadow: "0 0 1px 2px #81e3f9de !important",
        // },
        "&:hover": {
            "&& fieldset": {
                borderColor: "#d2d6da",
            },
        },
    };
});

/**
    options => array [id ,label]
    value
    onChange
 **/

export default function SimpleSelect({
    options,
    value,
    onChange,
    getOptionLabel,
    group = false,
    focus: autoFocus = false,
    ...rest
}) {
    return (
        <FormControl sx={{ width: "100%" }}>
            <MKSelect
                MenuProps={{
                    disablePortal: true,
                    PaperProps: {
                        sx: {
                            marginTop: "5px !important",
                            // minWidth: "150px !important",
                            // maxHeight: "100px !important",
                        },
                    },
                }}
                fullWidth
                value={value}
                onChange={onChange}
                {...rest}
            >
                {options.map((item) => {
                    return (
                        <MenuItem key={item._id} value={item._id}>
                            {getOptionLabel
                                ? item[getOptionLabel]
                                : item["label"]}
                        </MenuItem>
                    );
                })}
            </MKSelect>
        </FormControl>
    );
}
