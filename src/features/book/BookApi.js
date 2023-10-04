import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch, { api, usePostForm } from "../../app/hooks";

export const allBook = createAsyncThunk(
    "allBook/allBook",
    async (
        {
            id,
            page,
            limit,
            book_title,
            author_name,
            released_year,
            genre,
            edition,
            release,
        },
        { getState }
    ) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `books?user_id=${user._id}&publisher_id=${id}&book_name=${book_title}&author_name=${author_name}&released_year=${released_year}&page=${page}&limit=${limit}&genre=${genre}&edition=${edition}&release=${release}`,
            method: "GET",
            token: token,
        });

        return result;
    }
);

export const BookAdd = createAsyncThunk(
    "BookAdd/BookAdd",
    async ({ data, page, limit }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `books?user_id=${user._id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const BookUpdate = createAsyncThunk(
    "BookUpdate/BookUpdate",
    async ({ data, id, page, limit }, { getState }) => {
        const { user, token, publisher } = getState().loginInfo;

        const result = await useFetch({
            url: `books/${id}?user_id=${user._id}&publisher_id=${publisher[0]._id}&_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const BookDelete = createAsyncThunk(
    "BookDelete/BookDelete",
    async ({ id }, { getState }) => {
        const { user, token, publisher } = getState().loginInfo;
        // console.log(id);
        // console.log(user._id);
        // console.log(publisher[0]._id);
        // console.log(token);
        // return;
        const result = await useFetch({
            url: `books/${id}?user_id=${user._id}&publisher_id=${publisher[0]._id}`,
            method: "DELETE",
            token: token,
        });

        return result;
    }
);

export const ExpensesAdd = createAsyncThunk(
    "ExpensesAdd/ExpensesAdd",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await usePostForm({
            url: `expenses`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const ExpensesUpdate = createAsyncThunk(
    "ExpensesUpdate/ExpensesUpdate",
    async ({ data, id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await usePostForm({
            url: `expenses/${id}?_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const ExpensesDelete = createAsyncThunk(
    "ExpensesDelete/ExpensesDelete",
    async ({ id, book_id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await usePostForm({
            url: `expenses/${id}?book_id=${book_id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const GetBookExpenses = createAsyncThunk(
    "GetBookExpenses/GetBookExpenses",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `books/${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
