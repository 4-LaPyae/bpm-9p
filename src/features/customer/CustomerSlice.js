import { createSlice } from "@reduxjs/toolkit";
import {
    addCustomer,
    allCustomers,
    defaultAddress,
    deleteCustomer,
    getCustomerList,
    updateCustomer,
} from "./CustomerApi";

export const CustomerList = createSlice({
    name: "Customer",
    initialState: {
        customerList: [],
        status: null,
        loading: null,
        getStatus: null,
        address: null,
        updateAddress: {},
        newAddress: {},
        customers: [],
        getAllStatus: null,
        pagination: {
            page: 1,
            rowPerPages: 10,
            total: 0,
        },
    },
    reducers: {
        handleCustomer: (state, payload) => {
            const { data, ...rest } = payload;
            state.customers = data;
            state.pagination = rest;
        },
        resetAddress: (state) => {
            state.address = null;
        },
        resetUpdateAddress: (state) => {
            state.updateAddress = {};
        },
        chooseAddress: (state, { payload }) => {
            state.address = payload;
        },
        chooseUpdateAddress: (state, { payload }) => {
            state.updateAddress = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getCustomerList.fulfilled,
                (state, { payload }) => {
                    state.customerList = payload;
                    state.getStatus = "success";
                }
            )
            .addCase(allCustomers.pending, (state, { payload }) => {
                state.getAllStatus = "pending";
            })
            .addCase(allCustomers.fulfilled, (state, { payload }) => {
                state.getAllStatus = "success";
                CustomerList.caseReducers.handleCustomer(
                    state,
                    payload
                );
            })
            .addCase(getCustomerList.pending, (state) => {
                state.getStatus = "pending";
            })
            .addCase(addCustomer.pending, (state) => {
                state.status = "pending";
            })
            .addCase(addCustomer.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.customerList = payload.data;
            })
            .addCase(
                updateCustomer.fulfilled,
                (state, { payload }) => {
                    state.status = "success";
                    state.customerList = payload.data;
                }
            )
            .addCase(
                defaultAddress.fulfilled,
                (state, { payload }) => {
                    state.loading = "success";
                    // state.customerList = payload.data;
                }
            )
            .addCase(defaultAddress.pending, (state, { payload }) => {
                state.loading = "pending";
            })
            .addCase(
                deleteCustomer.fulfilled,
                (state, { payload }) => {
                    state.customerList = state.customerList.filter(
                        (l) => l._id !== payload.data._id
                    );
                }
            );
    },
});
export const CustomerSlice = CustomerList.reducer;
export const {
    resetAddress,
    chooseAddress,
    chooseUpdateAddress,
    resetUpdateAddress,
} = CustomerList.actions;
