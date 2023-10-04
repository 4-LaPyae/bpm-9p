import { forwardRef } from "react";
import MkButtonRoot from "./MkButtonRoot";
import PropTypes from "prop-types";

/**
 ```
 mkcolor : string.isRequired -> color code
 variant : string.isRequired 
 size : string -> "small" or not
 textTransform : 'capitalize' || default(uppercase)
 children : Wrap with your component name tag
 icon : "icon" -> if u want to add icon. Or not , u don't
 ```
 */
const MkButton = forwardRef(
    (
        {
            mkcolor,
            color = "info",
            icon,
            variant,
            children,
            textTransform = "",
            size,
            ...rest
        },
        ref
    ) => (
        <MkButtonRoot
            {...rest}
            ref={ref}
            color={color}
            ownerState={{ mkcolor, variant, size, icon, textTransform }}
        >
            {children}
        </MkButtonRoot>
    )
);
MkButton.defaultProps = {
    variant: "contained",
};
MkButton.propTypes = {
    mkcolor: PropTypes.string,
    icon: PropTypes.oneOf(["icon"]),
    variant: PropTypes.string.isRequired,
};

export default MkButton;
