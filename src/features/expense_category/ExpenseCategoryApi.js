import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const allExpenseCategory = createAsyncThunk(
  "allExpenseCategory/allExpenseCategory",
  async ({ page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `expense_lists?page=${page}&limit=${limit}`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const ExpenseCategoryAdd = createAsyncThunk(
  "ExpenseCategoryAdd/ExpenseCategoryAdd",
  async ({ data, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `expense_lists?page=${page}&limit=${limit}`,
      method: "POST",
      token: token,
      data: data,
    });
    return result;
  }
);

export const ExpenseCategoryUpdate = createAsyncThunk(
  "ExpenseCategoryUpdate/ExpenseCategoryUpdate",
  async ({ data, id, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `expense_lists/${id}?_method=PUT&page=${page}&limit=${limit}`,
      method: "POST",
      token: token,
      data: data,
    });
    return result;
  }
);

export const ExpenseCategoryDelete = createAsyncThunk(
  "ExpenseCategoryDelete/ExpenseCategoryDelete",
  async ({ id, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `expense_lists/${id}?page=${page}&limit=${limit}`,
      method: "DELETE",
      token: token,
    });
    return result;
  }
);

export const allExpenseCategories = createAsyncThunk(
  "allExpenseCategories/allExpenseCategories",
  async (_, { getState }) => {
    const { user, token } = getState().loginInfo;
    const result = await useFetch({
      url: `get_expense_lists?user_id=${user._id}`,
      method: "GET",
      token: token,
    });

    return result;
  }
);
