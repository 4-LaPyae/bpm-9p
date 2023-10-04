import { createSlice } from "@reduxjs/toolkit";
import { EditionDropdownList } from "./EditionApi";

export const EditionList = createSlice({
  name: "Edition",
  initialState: {
    editions: [],
    editions_dropdown: [],
    pagination: {},
    paginationData: {
      page: 1,
      limit: 5,
    },
  },
  reducers: {
    changePaginationData: (state, { payload }) => {
      state.paginationData = payload;
    },
    handleEdition: (state, payload) => {
      const { data, ...rest } = payload;
      state.editions = data;
      state.pagination = rest;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(EditionDropdownList.fulfilled, (state, { payload }) => {
      state.editions_dropdown = payload;
    });
  },
});
export const EditionSlice = EditionList.reducer;
export const { changePaginationData } = EditionList.actions;
