import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../app/hooks";

export const removeToken = createAsyncThunk(
    "removeToken/logout",
    async (token, { getState }) => {
        const { user } = getState().loginInfo;
        const response = await fetch(`${api}/user/logout?user_id=${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const result = await response.json();
        return result;
    }
);
