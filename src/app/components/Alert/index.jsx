import { Button, Snackbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { hideAlert, hideSuccess, stillError } from "./alertSlice";
import { useDispatch } from "react-redux";

const MkAlert = styled(MuiAlert)(({ theme }) => ({
    borderRadius: 5,
    padding: "5px 40px",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MkAlert
            elevation={4}
            ref={ref}
            variant="filled"
            {...props}
        />
    );
});

export default function index() {
    const initialState = {
        vertical: "top",
        horizontal: "center",
        variant: "error",
    };
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const { vertical, horizontal } = state;

    const { error, show, success } = useSelector(
        (state) => state.AlertControl
    );

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(hideAlert());
        dispatch(hideAction());
        if (success?.message) {
            console.log("success");
            dispatch(hideSuccess());
        } else {
            console.log("err");
            dispatch(stillError());
        }
    };

    useEffect(() => {
        console.log("Error consoling ", error, " ", show, success);
    }, [error, show, success]);

    const handleCompleteandPrint = () => {};
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={show}
                onClose={handleClose}
                key={vertical + horizontal}
                autoHideDuration={5000}
            >
                <Alert
                    onClose={handleClose}
                    severity={error.status ? "error" : "success"}
                    sx={{ width: "100%" }}
                >
                    {error?.message ?? success?.message ?? null}
                </Alert>
            </Snackbar>
        </>
    );
}

/*
 Usage 
When Error --> dispatch(addError());  dispatch(showAlert())

handle Error --> dispatch(stillError()) ; dispatch(hideAlert())

clear Error --> dispatch(clearError())

success --> dispatch(showSuccess('fdf'))

general --> dispatch(showAlert());
            dispatch(addError("Some fields is required"));

server fetch --> .then((result) => {
                    console.log("res ", result);
                    if (result.error) {
                        dispatch(addError("There was an error"));
                    } else {
                        dispatch(showSuccess("You added successfully"));
                        dispatch(clearError());
                    }
                    dispatch(showAlert());
                })
*/
