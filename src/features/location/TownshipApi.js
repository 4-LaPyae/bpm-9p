import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const townshipOptions = createAsyncThunk(
    "townshipOptions/townshipOptions",
    async ({ id }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `townships/${id}?user_id=${user._id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const allTownship = createAsyncThunk(
    "allTownship/allTownship",
    async ({ page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `townships?page=${page}&limit=${limit}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addTownship = createAsyncThunk(
    "addTownship/addTownship",
    async ({ data, page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `townships?page=${page}&limit=${limit}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const updateTownship = createAsyncThunk(
    "updateTownship/updateTownship",
    async ({ id, data, page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `townships/${id}?page=${page}&limit=${limit}&_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);
export const deleteTownship = createAsyncThunk(
    "deleteTownship/deleteTownship",
    async ({ id, page, limit }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `townships/${id}?page=${page}&limit=${limit}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);
