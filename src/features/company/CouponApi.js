import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { usePostForm } from "../../app/hooks";

export const Coupon_List = createAsyncThunk(
    "coupon_list/coupon_list",
    async ({ page, limit, campaign_id, use }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `coupons?page=${page}&limit=${limit}&campaign_id=${campaign_id}&use=${use}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const add_coupon = createAsyncThunk(
    "add_coupon/add_coupon",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `coupons`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const edit_coupon = createAsyncThunk(
    "edit_coupon/eidt_coupon",
    async ({ data, id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `coupons/${id}?_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);
