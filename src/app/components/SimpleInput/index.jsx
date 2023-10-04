import { InputBase } from "@mui/material";
import React, { useEffect, useRef } from "react";

/**
 ```
    required = true,
    id = "input",
    placeholder = "Name",
    name = "name",
    autoComplete = "off",
    autoFocus = false,
    ...rest
    ```
 */
export default ({
    required = true,
    id = "input",
    placeholder = "Name",
    name = "name",
    autoComplete = "off",
    autoFocus = false,
    ...rest
}) => {
    const inputElement = useRef(null);

    useEffect(() => {
        if (autoFocus) {
            inputElement.current.children[0].focus();
        }
    }, [autoFocus]);
    return (
        <InputBase
            required={required}
            id={id}
            ref={inputElement}
            {...rest}
            // label="Email Address"
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete}
            // autoFocus={autoFocus}
            sx={{
                border: "#d2d6da solid 2px",
                "&.Mui-focused": {
                    border: "#35d1f5 solid 2px",
                    boxShadow: `0 0 1px 2px #81e3f9de`,
                    outline: 0,
                },
            }}
        />
    );
};
