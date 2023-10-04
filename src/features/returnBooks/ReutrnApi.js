import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const ReturnList = createAsyncThunk(
    "ReturnList/ReturnList",
    async (
        { page, limit, start, end, code, staff },
        { getState }
    ) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `returnBook?user_id=${user._id}&start=${start}&end=${end}&invoiceCode=${code}&staff=${staff}&page=${page}&limit=${limit}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const DamageList = createAsyncThunk(
    "DamageList/DamageList",
    async (
        { page, limit, start, end, code, staff },
        { getState }
    ) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `damageBook?user_id=${user._id}&start=${start}&end=${end}&invoiceCode=${code}&staff=${staff}&page=${page}&limit=${limit}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
