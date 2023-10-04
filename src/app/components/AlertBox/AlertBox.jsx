import { Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const MkAlert = styled(MuiAlert)(({ theme }) => ({
    borderRadius: 5,
    padding: "5px 40px",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MkAlert elevation={4} ref={ref} variant="filled" {...props} />;
});

export default function AlertBox({ alertState }) {
    const initialState = {
        open: false,
        vertical: "top",
        horizontal: "center",
        variant: "success",
        message: "This is success message",
    };
    const [state, setState] = useState(initialState);

    const { vertical, horizontal, open } = state;

    useEffect(() => {
        setState(alertState?.open ? alertState : initialState);
    }, [alertState]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setState({ ...state, open: false });
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                autoHideDuration={2000}
            >
                <Alert
                    onClose={handleClose}
                    severity={state.variant}
                    sx={{ width: "100%" }}
                >
                    {state.message}
                </Alert>
            </Snackbar>
        </>
    );
}
