import { FormControlLabel } from "@mui/material";
import { forwardRef } from "react";
import SwitchRoot from "./SwitchRoot";

/**
 ```
 label : string -> if u want to show label
 switchColor : string -> color code string 
 size : 'small' -> if u want to small, use that
 ```
 */
const MkSwitch = forwardRef(
    ({ label, switchColor, size = "medium", ...rest }, ref) => {
        if (label) {
            return (
                <FormControlLabel
                    control={
                        <SwitchRoot
                            {...rest}
                            ref={ref}
                            sx={{ m: 1 }}
                            ownerState={{ size, switchColor }}
                        />
                    }
                    label={label}
                />
            );
        } else {
            return (
                <SwitchRoot
                    {...rest}
                    ref={ref}
                    ownerState={{ size, switchColor }}
                />
            );
        }
    }
);

export default MkSwitch;
