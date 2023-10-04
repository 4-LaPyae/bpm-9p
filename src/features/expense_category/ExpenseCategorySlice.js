import { createSlice } from "@reduxjs/toolkit";
import {
  allExpenseCategories,
  allExpenseCategory,
  ExpenseCategoryAdd,
  ExpenseCategoryDelete,
  ExpenseCategoryUpdate,
} from "./ExpenseCategoryApi";

export const ExpenseCategoryList = createSlice({
  name: "ExpenseCategory",
  initialState: {
    expense_categories: [],
    expense_categories_dropdown: [],
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
    handleExpenseCategory: (state, payload) => {
      const { data, ...rest } = payload;
      state.expense_categories = data;
      state.pagination = rest;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allExpenseCategory.fulfilled, (state, { payload }) => {
        ExpenseCategoryList.caseReducers.handleExpenseCategory(state, payload);
      })
      .addCase(ExpenseCategoryAdd.fulfilled, (state, { payload }) => {
        ExpenseCategoryList.caseReducers.handleExpenseCategory(state, payload);
      })
      .addCase(ExpenseCategoryUpdate.fulfilled, (state, { payload }) => {
        ExpenseCategoryList.caseReducers.handleExpenseCategory(state, payload);
      })
      .addCase(ExpenseCategoryDelete.fulfilled, (state, { payload }) => {
        ExpenseCategoryList.caseReducers.handleExpenseCategory(state, payload);
      })
      .addCase(allExpenseCategories.fulfilled, (state, { payload }) => {
        console.log({ payload });
        state.expense_categories_dropdown = payload;
        console.log(
          "state.expense_cate_dropdown:",
          state.expense_categories_dropdown
        );
      });
  },
});
export const ExpenseCategorySlice = ExpenseCategoryList.reducer;
export const { changePaginationData } = ExpenseCategoryList.actions;
