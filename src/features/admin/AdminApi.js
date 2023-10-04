import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const getAdminList = createAsyncThunk(
    "getAdminList/getAdminList",
    async (_, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: "admins",
            method: "GET",
            token: token,
        });
        return result;
    }
);
