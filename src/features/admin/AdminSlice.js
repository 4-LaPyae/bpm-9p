import { createSlice } from "@reduxjs/toolkit";

import { getAdminList } from "./AdminApi";
import { checkToken } from "../../app/helper/checkToken";

const adminListInitial = {
    adminList: [],
    adminPagination: null,
};

export const AdminList = createSlice({
    name: "getAdminList",
    initialState: adminListInitial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAdminList.fulfilled,
            (state, { payload }) => {
                const { data, ...rest } = payload;
                const modifyAdminName = data.map((admin) => {
                    return {
                        active: admin.active,
                        email: admin.email,
                        name:
                            admin.first_name + " " + admin.last_name,
                        id: admin.id,
                        last_login: admin.last_login,
                    };
                });
                state.adminList = modifyAdminName;
                state.adminPagination = rest;
            }
        );
    },
});

export const adminList = AdminList.reducer;
