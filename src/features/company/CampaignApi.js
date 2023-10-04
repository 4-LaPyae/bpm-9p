import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { usePostForm } from "../../app/hooks";

export const getCampaignList = createAsyncThunk(
    "getCampaignList/getCampaignList",
    async ({ page, limit, id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `campaigns?page=${page + 1}&limit=${limit}&company_id=${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addCampaign = createAsyncThunk(
    "addCampaign/addCampaign",
    async (data, { getState }) => {
        const { token } = getState().loginInfo;
        const result = usePostForm({
            url: `campaigns`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const EditCampaignDetail = createAsyncThunk(
    "editCampaignDetail/editCampaignDetail",
    async ({ id, data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = usePostForm({
            url: `campaigns/${id}?_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const statusCampaign = createAsyncThunk(
    "statusCampaign/statusCampaign",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `campaigns/${id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const finishCampaign = createAsyncThunk(
    "finishCampaign/finishCampaign",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `campaigns/finish/${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

// Promotions

export const promotion_list = createAsyncThunk(
    "promotion_list/promotion_list",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `promotions?page=1&limit=10&campaign_id=${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addPromotion = createAsyncThunk(
    "promotion_list/addPromotion",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = usePostForm({
            url: "promotions",
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const edit_promotion = createAsyncThunk(
    "promotion_list/edit_promotion",
    async ({ data, id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = usePostForm({
            url: `promotions/${id}?_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const silent_promotion = createAsyncThunk(
    "promotion_list/silent_promotion",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `promotions/toggleSilent/${id}`,
            method: "POST",
            token: token,
        });
        return result;
    }
);

export const disabled_promotion = createAsyncThunk(
    "promotion_list/disabled_promotion",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `promotions/${id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const reorder_promotion = createAsyncThunk(
    "promotion_list/reorder_promotion",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `promotions/reorder`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const add_pretext = createAsyncThunk(
    "add_pretext/add_pretext",
    async ({ id, data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `campaigns/pretext/${id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const Wheel_Color = createAsyncThunk(
    "wheel_color/wheel_color",
    async ({ id, data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `campaigns/updatewheel/${id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);
