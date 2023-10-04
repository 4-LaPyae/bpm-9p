import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { usePostForm } from "../../app/hooks";

export const export_coupon = createAsyncThunk(
    "export/export",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `coupons/export?campaign_id=${id}`,
            method: "POST",
            token: token,
        });
        return result;
    }
);
