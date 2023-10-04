import {InputBase, InputLabel} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {PropTypes} from 'prop-types';

/**
    ```
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    focus : (boolean || value) -> wanna focus when state change or not
    multiline : default false
    rows 
    ```
 */
function InputFormComponent({
    label,
    placeholder,
    name,
    focus = false,
    multiline = false,
    rows,
    column,
    ...rest
}) {
    const inputElement = useRef(null);

    useEffect(() => {
        if (focus) {
            inputElement.current.children[0].focus();
        }
    }, [focus]);

    return (
        <>
            <InputLabel
                htmlFor={label.toLowerCase()}
                sx={{mb: 1, fontSize: '14.5px'}}
            >
                {label}
            </InputLabel>
            <InputBase
                {...rest}
                ref={inputElement}
                fullWidth
                id={label.toLowerCase()}
                placeholder={placeholder}
                name={name}
                autoComplete="off"
                multiline={multiline}
                rows={rows}
                // autoFocus
                sx={{
                    width: '100%',
                    mb: 0.5,
                    border: '#d2d6da solid 2px',
                    '&.Mui-focused': {
                        border: '#35d1f5 solid 2px',
                        boxShadow: `0 0 1px 2px #81e3f9de`,
                        outline: 0,
                    },
                }}
            />
        </>
    );
}

InputFormComponent.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default InputFormComponent;
