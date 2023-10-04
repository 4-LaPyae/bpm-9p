import { createSlice } from "@reduxjs/toolkit";
import { add_tandc, edit_tandc, tandc_list } from "./TandcApi";

const tandcListInitial = {
    tandcList: [],
    tandcPagination: null,
    selectedTandc: null,
};

export const TandcList = createSlice({
    name: "tandc_list",
    initialState: tandcListInitial,
    reducers: {
        onSelectTandc: (state, { payload }) => {
            state.selectedTandc = payload;
        },
        onReorderTandc: (state, { payload }) => {
            state.tandcList = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(tandc_list.fulfilled, (state, { payload }) => {
                state.tandcList = payload;
            })
            .addCase(add_tandc.fulfilled, (state, { payload }) => {
                state.tandcList.push(payload);
            })
            .addCase(edit_tandc.fulfilled, (state, { payload }) => {
                state.tandcList = state.tandcList.map((item) => {
                    if (item.id === payload.id) {
                        return { ...payload };
                    } else {
                        return { ...item };
                    }
                });
            });
    },
});

export const tandcList = TandcList.reducer;
export const { onSelectTandc, onReorderTandc } = TandcList.actions;
