import { createSlice } from "@reduxjs/toolkit";

export const AlertError = createSlice({
    name: "alert",
    initialState: {
        success: {
            message: null,
        },
        error: {
            status: false,
            message: null,
        },
        show: false,
    },
    reducers: {
        showAlert: (state) => {
            state.show = true;
        },
        hideAlert: (state) => {
            state.show = false;
        },
        stillError: (state) => {
            state.error = {
                status: true,
                message: null,
            };
        },
        showSuccess: (state, { payload }) => {
            state.success = {
                message: payload,
            };
            state.error = {
                status: false,
                message: null,
            };
        },
        hideSuccess: (state) => {
            console.log("calling success");
            state.success = {
                message: null,
            };
            state.error = {
                status: false,
                message: null,
            };
        },
        addError: (state, { payload }) => {
            state.error = {
                status: true,
                message: payload,
            };
        },
        clearError: (state) => {
            state.error = {
                status: false,
                message: null,
            };
        },
    },
});

export const AlertControl = AlertError.reducer;
export const {
    showAlert,
    showSuccess,
    hideSuccess,
    hideAlert,
    stillError,
    addError,
    clearError,
} = AlertError.actions;
