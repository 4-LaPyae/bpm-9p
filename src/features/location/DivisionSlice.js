import {createSlice} from '@reduxjs/toolkit';
import {
    addDivision,
    allDivision,
    deleteDivision,
    divisionOptions,
    updateDivision,
} from './DivisionApi';

export const DivisionList = createSlice({
    name: 'Division',
    initialState: {
        division: [],
        divisionOptions: [],
        pagination: {},
        paginationData: {
            page: 1,
            limit: 10,
        },
    },
    reducers: {
        changePaginationData: (state, {payload}) => {
            state.paginationData = payload;
        },
        handleDivision: (state, payload) => {
            const {data, ...rest} = payload;
            state.division = data;
            state.pagination = rest;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allDivision.fulfilled, (state, {payload}) => {
                DivisionList.caseReducers.handleDivision(
                    state,
                    payload
                );
            })
            .addCase(addDivision.fulfilled, (state, {payload}) => {
                DivisionList.caseReducers.handleDivision(
                    state,
                    payload
                );
            })
            .addCase(updateDivision.fulfilled, (state, {payload}) => {
                DivisionList.caseReducers.handleDivision(
                    state,
                    payload
                );
            })
            .addCase(deleteDivision.fulfilled, (state, {payload}) => {
                DivisionList.caseReducers.handleDivision(
                    state,
                    payload
                );
            })
            .addCase(
                divisionOptions.fulfilled,
                (state, {payload}) => {
                    state.divisionOptions = payload.data;
                }
            );
    },
});
export const DivisionListSlice = DivisionList.reducer;
export const {changePaginationData} = DivisionList.actions;
