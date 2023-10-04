import { createSlice, current } from "@reduxjs/toolkit";

export const SelectCategoriesList = createSlice({
  name: "select category",
  initialState: {
    select_categories: [],
  },
  reducers: {
    initialSelectCategories: (state, { payload }) => {
      state.select_categories = [];
    },
    addSelectCategories: (state, { payload }) => {
      console.log({ payload });
      state.select_categories.push(payload);
    },
    removeSelectCategories: (state, { payload }) => {
      state.select_categories = state.select_categories.filter((item) => {
        if (item.related_category_id) {
          return item.related_category_id !== payload.id;
        } else {
          return item.id !== payload.id;
        }
      });
    },
    overwriteCategories: (state, { payload }) => {
      state.select_categories.splice(0, state.select_categories.length);
      state.select_categories.push(...payload);
    },
  },
});
export const SelectCategoryListSlice = SelectCategoriesList.reducer;
export const {
  addSelectCategories,
  removeSelectCategories,
  overwriteCategories,
  initialSelectCategories,
} = SelectCategoriesList.actions;
