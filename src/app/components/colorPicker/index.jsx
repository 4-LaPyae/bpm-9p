import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hexToRgba from "../../helper/hexToRgba";
import { hexToRgb } from "@mui/material";
import { onChangeBackground } from "../../../features/company/CampaignSlice";

/**
 ```
 colorCode : string.isRequired -> hex code
 changeColorCode : fn().isRequired -> when color box close ,to change the color 
 side : "right" || 'left' -> where to want appear
 body : boolean -> where to click to close color picker
 close : fn(){
    void(0)
 } -> when close if u want to do
 ```
 */
export default ({
    colorCode,
    listItem,
    onChangeAction,
    changeColorCode,
    side = "right",
    body = false,
    close = () => {
        void 0;
    },
}) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const dispatch = useDispatch();
    const [color, setColor] = useState("");

    const styles = reactCSS({
        default: {
            color: {
                width: "36px",
                height: "14px",
                borderRadius: "2px",
                background: `${color}`,
            },
            swatch: {
                padding: "5px",
                background: "#fff",
                borderRadius: "1px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer",
            },
            popover: {
                position: "absolute",
                zIndex: "2",
                transform: `${
                    side === "right"
                        ? "translate(25%, -102%)"
                        : "translate(-104%, -104%)"
                }`,
            },
        },
    });

    const handleClick = () => {
        setDisplayColorPicker((value) => !value);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
        close();
    };

    const handleChange = (color) => {
        changeColorCode(color.hex);
        setColor(color.hex);
        dispatch(onChangeAction(color.hex));
    };
    useEffect(() => {
        changeColorCode(colorCode);
        setColor(colorCode);
    }, [colorCode]);

    return (
        <div>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color} />
            </div>
            {displayColorPicker ? (
                <div style={styles.popover}>
                    <Portal onClose={handleClose} body={body} item={listItem} />
                    <ChromePicker
                        color={color}
                        onChange={handleChange}
                        disableAlpha={true}
                    />
                </div>
            ) : null}
        </div>
    );
};

// for portal to close when click portal area

export const Portal = ({ onClose, body, item }) => {
    const styles = reactCSS({
        default: {
            cover: {
                position: body ? "fixed" : "absolute",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
            },
        },
    });
    return ReactDOM.createPortal(
        <div style={styles.cover} onClick={onClose} />,
        body
            ? document.body
            : document.getElementById(`color-portal-${item.id}`)
    );
};
