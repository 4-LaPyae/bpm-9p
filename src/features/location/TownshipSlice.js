import {createSlice} from '@reduxjs/toolkit';
import {
    addTownship,
    allTownship,
    deleteTownship,
    townshipOptions,
    updateTownship,
} from './TownshipApi';

export const TownshipList = createSlice({
    name: 'Township',
    initialState: {
        townships: [],
        townshipOption: [],
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
        handleTownship: (state, payload) => {
            const {data, ...rest} = payload;
            state.townships = data;
            state.pagination = rest;
        },
        handleTownshipOptions: (state, {payload}) => {
            state.townshipOption = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allTownship.fulfilled, (state, {payload}) => {
                TownshipList.caseReducers.handleTownship(
                    state,
                    payload
                );
            })
            .addCase(addTownship.fulfilled, (state, {payload}) => {
                TownshipList.caseReducers.handleTownship(
                    state,
                    payload
                );
            })
            .addCase(updateTownship.fulfilled, (state, {payload}) => {
                TownshipList.caseReducers.handleTownship(
                    state,
                    payload
                );
            })
            .addCase(deleteTownship.fulfilled, (state, {payload}) => {
                TownshipList.caseReducers.handleTownship(
                    state,
                    payload
                );
            })
            .addCase(
                townshipOptions.fulfilled,
                (state, {payload}) => {
                    state.townshipOption = payload.data;
                }
            );
    },
});
export const TownshipListSlice = TownshipList.reducer;
export const {changePaginationData, handleTownshipOptions} =
    TownshipList.actions;
