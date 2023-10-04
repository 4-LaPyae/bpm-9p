import { createSlice } from "@reduxjs/toolkit";
import { export_coupon } from "./csvApi";

const exportinitial = {
    csvdata: {},
};

const csvExport = createSlice({
    name: "export",
    initialState: exportinitial,
    extraReducers: (builder) => {
        builder.addCase(export_coupon.fulfilled, (state, { payload }) => {
            state.csvdata = payload;
        });
    },
});

export const csvexport = csvExport.reducer;
