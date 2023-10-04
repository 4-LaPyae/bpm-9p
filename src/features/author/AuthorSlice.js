import { createSlice } from "@reduxjs/toolkit";
import {
    allAuthor,
    AuthorAdd,
    AuthorDelete,
    AuthorUpdate,
    searchAuthor,
} from "./AuthorApi";
import { checkToken } from "../../app/helper/checkToken";

export const AuthorList = createSlice({
    name: "Author",
    initialState: {
        authors: [],
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
        handleAuthor: (state, payload) => {
            const { data, ...rest } = payload;
            state.authors = data;
            state.pagination = rest;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allAuthor.fulfilled, (state, { payload }) => {
                console.log("get");
                AuthorList.caseReducers.handleAuthor(state, payload);
            })
            .addCase(AuthorAdd.fulfilled, (state, { payload }) => {
                AuthorList.caseReducers.handleAuthor(state, payload);
            })
            .addCase(AuthorUpdate.fulfilled, (state, { payload }) => {
                AuthorList.caseReducers.handleAuthor(state, payload);
            })
            .addCase(AuthorDelete.fulfilled, (state, { payload }) => {
                AuthorList.caseReducers.handleAuthor(state, payload);
            });
    },
});
export const AuthorSlice = AuthorList.reducer;
export const { changePaginationData } = AuthorList.actions;

export const SearchAuthorList = createSlice({
    name: "SearchAuthorList",
    initialState: {
        loading: true,
        searchAuthorList: [],
    },
    reducers: {
        onInitSearchAuthor: (state, { payload }) => {
            state.searchAuthorList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchAuthor.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(searchAuthor.fulfilled, (state, { payload }) => {
                state.searchAuthorList = [...payload];
                state.loading = false;
            });
    },
});
export const SearchAuthorSlice = SearchAuthorList.reducer;
export const { onInitSearchAuthor } = SearchAuthorList.actions;
