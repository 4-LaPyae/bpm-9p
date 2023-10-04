import { Popover, Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function index({ children, open, onOpen, onClose }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const openAnchorEl = Boolean(anchorEl);
    const id = openAnchorEl ? "simple-popover" : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     this is the main part
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        onOpen();
    };

    useEffect(() => {
        if (open) {
            console.log("opening");
            onOpen();
        } else {
            console.log("closing");
            onClose();
            handleClose();
        }
    }, [open]);

    /* ------------------------------------------------------------ */

    return (
        <Box>
            <Box onClick={handleClick} sx={{ display: "inherit" }}>
                {children[0]}
            </Box>
            <Popover
                id={id}
                open={openAnchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                sx={{
                    mt: "10px",
                    boxShadow:
                        "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem !important",
                }}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 0,
                    },
                }}
            >
                {/* this is arrow */}
                <Box
                    sx={{
                        position: "relative",
                        mt: "10px",
                        "&::before": {
                            backgroundColor: "#F5F5F5",
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: 12,
                            height: 12,
                            top: -6,
                            transform: "rotate(45deg)",
                            left: "calc(50% - 6px)",
                        },
                    }}
                />
                {children[1]}
            </Popover>
        </Box>
    );
}

export default index;
