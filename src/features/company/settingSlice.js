import { createSlice } from "@reduxjs/toolkit";
import { add_tandc, edit_tandc, tandc_list } from "./TandcApi";
import { getCompanyDetail } from "./CompanyApi";
import { updatePrintSetting } from "./settingApi";
import { checkToken } from "../../app/helper/checkToken";

const settingInitial = {
    setting: null,
    commercial: null,
};

export const Setting = createSlice({
    name: "setting",
    initialState: settingInitial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getCompanyDetail.fulfilled,
                (state, { payload }) => {
                    console.log(payload);
                    state.setting = payload.publisher.print_setting;
                    state.commercial =
                        payload.publisher.commercial_tax;
                }
            )
            .addCase(
                updatePrintSetting.fulfilled,
                (state, { payload }) => {
                    console.log(payload);
                    state.setting = payload.data.print_setting;
                    state.commercial = payload.data.commercial_tax;
                }
            );
    },
});

export const SettingSlice = Setting.reducer;
