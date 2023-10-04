import React from "react";
import "font-awesome/css/font-awesome.min.css";

function IconWrap(props) {
    let size;
    switch (props.size) {
        case "lg":
            size = "fa-lg";
            break;
        case "xl":
            size = "fa-xl";
            break;

        default:
            size = "fa-sm";
    }
    return (
        <>
            <i
                style={{ color: props.sx?.color || "#000000", ...props.sx }}
                className={`${props.class} ${size}`}
            />
        </>
    );
}

export default IconWrap;
