import { createSlice } from "@reduxjs/toolkit";
import {
    CourierDelete,
    addCourier,
    getCouriersList,
    updateCourier,
    dropdownCourisers,
} from "./CouriersApi";

export const CouriersList = createSlice({
    name: "Courisers",
    initialState: {
        addStatus: null,
        updateStatus: null,
        getStatus: null,
        couriers: null,
        courierStatus: null,
        pagination: {},
        dropDownCouriers: [],
        paginationData: {
            page: 1,
            limit: 10,
        },
    },
    reducers: {
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        resetCouriers: (state) => {
            state.couriers = null;
        },
        handleCourier: (state, payload) => {
            // console.log(payload);
            const { data, ...rest } = payload;
            // console.log("From handle book" + data);
            // console.log("From handle book" + rest);
            state.couriers = data;
            state.pagination = rest;
        },
        handlerCourier: (state) => {
            state.couriers = null;
        },
        resetAddStatus: (state) => {
            state.addStatus = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getCouriersList.pending,
                (state, { payload }) => {
                    // console.log("add Book", payload);
                    state.getStatus = "pending";
                }
            )
            .addCase(
                getCouriersList.fulfilled,
                (state, { payload }) => {
                    // console.log({ payload });
                    state.getStatus = "success";
                    CouriersList.caseReducers.handleCourier(
                        state,
                        payload
                    );
                }
            )
            .addCase(addCourier.pending, (state, { payload }) => {
                // console.log("add Book", payload);
                state.addStatus = "pending";
            })
            .addCase(addCourier.fulfilled, (state, { payload }) => {
                // console.log("add Book", payload);
                CouriersList.caseReducers.handleCourier(
                    state,
                    payload
                );
                state.addStatus = "success";
            })
            .addCase(updateCourier.pending, (state, { payload }) => {
                console.log(payload);
                state.updateStatus = "pending";
            })
            .addCase(
                updateCourier.fulfilled,
                (state, { payload }) => {
                    console.log(payload);
                    state.updateStatus = "success";
                    CouriersList.caseReducers.handleCourier(
                        state,
                        payload
                    );
                }
            )
            .addCase(
                dropdownCourisers.fulfilled,
                (state, { payload }) => {
                    state.dropDownCouriers = payload;
                }
            )
            .addCase(
                CourierDelete.fulfilled,
                (state, { payload }) => {
                    console.log(payload);
                    state.couriers = state.couriers.map((i) => {
                        if (i._id === payload.data._id) {
                            return {
                                ...i,
                                status: payload.data.status,
                            };
                        } else {
                            return {
                                ...i,
                            };
                        }
                    });
                    // CouriersList.caseReducers.handleCourier(state, payload);
                }
            );
    },
});
export const CouriersSlice = CouriersList.reducer;
export const {
    changePaginationData,
    handlerCourier,
    resetAddStatus,
    resetCouriers,
} = CouriersList.actions;
