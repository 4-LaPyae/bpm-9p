import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { usePostForm } from "../../app/hooks";

export const tandc_list = createAsyncThunk(
    "tandc_list/tandc_list",
    async ({ page, limit, campaign_id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `terms_and_conditions?page=${page}&limit=${limit}&campaign_id=${campaign_id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const add_tandc = createAsyncThunk(
    "tandc_list/add_tandc",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `terms_and_conditions`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const edit_tandc = createAsyncThunk(
    "tandc_list/edit_tandc",
    async ({ data, id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `terms_and_conditions/${id}?_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const reorder_tandc = createAsyncThunk(
    "tandc_list/edit_tandc",
    async ({ data, id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `terms_and_conditions/reorder`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);
