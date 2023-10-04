import { createSlice } from "@reduxjs/toolkit";
import {
  GenreDropdownList,
  allGenres,
  GenreAdd,
  GenreUpdate,
  GenreDelete,
} from "./GenreApi";

export const GenreList = createSlice({
  name: "Genre",
  initialState: {
    genres: [],
    genres_dropdown: [],
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
    handleGenre: (state, payload) => {
      console.log({ payload });
      const { data, ...rest } = payload;
      state.genres = data;
      state.pagination = rest;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allGenres.fulfilled, (state, { payload }) => {
        GenreList.caseReducers.handleGenre(state, payload);
      })
      .addCase(GenreAdd.fulfilled, (state, { payload }) => {
        GenreList.caseReducers.handleGenre(state, payload);
      })
      .addCase(GenreUpdate.fulfilled, (state, { payload }) => {
        GenreList.caseReducers.handleGenre(state, payload);
      })
      .addCase(GenreDelete.fulfilled, (state, { payload }) => {
        GenreList.caseReducers.handleGenre(state, payload);
      })
      .addCase(GenreDropdownList.fulfilled, (state, { payload }) => {
        state.genres_dropdown = payload;
      });
  },
});
export const GenreSlice = GenreList.reducer;
export const { changePaginationData } = GenreList.actions;
