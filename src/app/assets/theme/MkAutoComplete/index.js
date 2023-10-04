import {
    InputBase,
    Autocomplete,
    TextField,
    Popper,
} from "@mui/material";
import { forwardRef } from "react";
import RootAutoComplete from "./RootAutoComplete";

const MkAutoComplete = forwardRef(
    (
        {
            freeSolo = false,
            placeholder = "",
            disabled = false,
            required = false,
            fullWidth = false,
            onTextChange = () => {
                void 0;
            },
            onBlurChange = () => {
                void 0;
            },
            ...rest
        },
        ref
    ) => {
        const PopperMy = function (props) {
            return (
                <Popper
                    {...props}
                    style={{ width: 250 }}
                    placement="bottom"
                />
            );
        };
        return (
            <RootAutoComplete
                ref={ref}
                disablePortal
                freeSolo={freeSolo}
                clearOnBlur={true}
                {...rest}
                disabled={disabled}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={onTextChange}
                        placeholder={placeholder}
                        required={required}
                        onBlur={onBlurChange}
                    />
                )}
                ownerState={{ fullWidth }}
                // Force menu to open below, with the correct width
                PopperComponent={({ style, ...props }) => (
                    <Popper
                        {...props}
                        style={{ ...style, height: 0, margin: 0 }} // width is passed in 'style' prop
                    />
                )}
                // Set menu max height,background, color , etc... (optional)
                ListboxProps={{
                    style: {
                        maxHeight: "200px",
                        background: " #e1e1e1",
                        color: "#1f1e1e",
                        p: 5,
                    },
                }}
            />
        );
    }
);

export default MkAutoComplete;
