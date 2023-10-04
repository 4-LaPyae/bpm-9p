import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch from "../../app/hooks";

export const Cities = createAsyncThunk(
    "cities/cities",
    async (_, { user, getState }) => {
        const { token } = getState().loginInfo;
        const result = useFetch({
            url: `township?user_id=${user_id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
