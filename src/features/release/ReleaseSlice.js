import { createSlice } from '@reduxjs/toolkit';
import {
    ReleaseDropdownList,
} from './ReleaseApi';

export const ReleaseList = createSlice({
    name: 'Release',
    initialState: {
        releases: [],
        releases_dropdown: [],
        pagination: {},
        paginationData: {
            page: 1,
            limit: 5,
        },
    },
    reducers: {
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        handleEdition: (state, payload) => {
            const { data, ...rest } = payload;
            state.releases = data;
            state.pagination = rest;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                ReleaseDropdownList.fulfilled,
                (state, { payload }) => {
                    state.releases_dropdown = payload;
                }
            );
    },
});
export const ReleaseSlice = ReleaseList.reducer;
export const { changePaginationData } = ReleaseList.actions;
