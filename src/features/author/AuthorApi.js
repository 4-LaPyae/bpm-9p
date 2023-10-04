import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const allAuthor = createAsyncThunk(
  "allAuthor/allAuthor",
  async ({ user, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `authors?user_id=${user._id}&limit=${limit}&page=${page}`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const AuthorAdd = createAsyncThunk(
  "AuthorAdd/AuthorAdd",
  async ({ data, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `authors?page=${page}&limit=${limit}`,
      method: "POST",
      token: token,
      data: data,
    });
    return result;
  }
);

export const AuthorUpdate = createAsyncThunk(
  "AuthorUpdate/AuthorUpdate",
  async ({ data, id, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `authors/${id}?_method=PUT&page=${page}&limit=${limit}`,
      method: "POST",
      token: token,
      data: data,
    });
    return result;
  }
);

export const AuthorDelete = createAsyncThunk(
  "AuthorDelete/AuthorDelete",
  async ({ id, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `authors/${id}?page=${page}&limit=${limit}`,
      method: "DELETE",
      token: token,
    });
    return result;
  }
);

export const searchAuthor = createAsyncThunk(
  "searchAuthor/searchAuthor",
  async ({ name }, { getState }) => {
    const { user, token } = getState().loginInfo;
    const result = await useFetch({
      // url: `authors/search?name=${name}`,
      url: `authors/search?user_id=${user._id}&name=${name}`,
      method: "POST",
      token: token,
    });
    return result;
  }
);
