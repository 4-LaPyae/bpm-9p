import { createSlice } from "@reduxjs/toolkit";
import { DamageList, ReturnList } from "./ReutrnApi";

export const ReturnDamageList = createSlice({
    name: "returnDamageList",
    initialState: {
        damageList: [],
        returnList: [],
        getReuturnStatus: null,
        getDamageStatus: null,
        returnPagination: {},
        returnPaginationData: {
            page: 1,
            limit: 10,
        },
        damagePagination: {},
        damagePaginationData: {
            page: 1,
            limit: 10,
        },
    },
    reducers: {
        changeReturnPaginationData: (state, { payload }) => {
            state.returnPaginationData = payload;
        },
        changeDamagePaginationData: (state, { payload }) => {
            state.damagePaginationData = payload;
        },
        handleReturn: (state, payload) => {
            const { data, ...rest } = payload;
            state.returnList = data;
            state.returnPagination = rest;
        },
        handleDamage: (state, payload) => {
            const { data, ...rest } = payload;
            state.damageList = data;
            state.damagePagination = rest;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(ReturnList.pending, (state) => {
            state.getReuturnStatus = "pending";
        });
        builder.addCase(
            ReturnList.fulfilled,
            (state, { payload }) => {
                state.getReuturnStatus = "success";
                ReturnDamageList.caseReducers.handleReturn(
                    state,
                    payload
                );
            }
        );
        builder.addCase(DamageList.pending, (state) => {
            state.getDamageStatus = "pending";
        });
        builder.addCase(
            DamageList.fulfilled,
            (state, { payload }) => {
                state.getDamageStatus = "success";
                ReturnDamageList.caseReducers.handleDamage(
                    state,
                    payload
                );
            }
        );
    },
});
export const ReturnDamageListSlice = ReturnDamageList.reducer;
export const {
    changeReturnPaginationData,
    changeDamagePaginationData,
} = ReturnDamageList.actions;
