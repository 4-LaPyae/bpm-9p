import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const allGenres = createAsyncThunk(
    "allGenres/allGenres",
    async ({ page, limit }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `genres?page=${page}&limit=${limit}`,
            // url: `get_genres?user_id=${user._id}`,
            method: "GET",
            token: token,
        });
        console.log({ result });
        return result;
    }
);

export const GenreAdd = createAsyncThunk(
    "GenreAdd/GenreAdd",
    async ({ data, page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `genres?page=${page}&limit=${limit}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const GenreUpdate = createAsyncThunk(
    "GenreUpdate/GenreUpdate",
    async ({ data, id, page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `genres/${id}?_method=PUT&page=${page}&limit=${limit}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const GenreDelete = createAsyncThunk(
    "GenreDelete/GenreDelete",
    async ({ id, page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `genres/${id}?page=${page}&limit=${limit}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const GenreDropdownList = createAsyncThunk(
    "GenreDropdownList/GenreDropdownList",
    async (_, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `get_genres?user_id=${user._id}`,
            method: "GET",
            token: token,
        });
        // console.log("GenreDropdownList", result);
        return result;
    }
);
