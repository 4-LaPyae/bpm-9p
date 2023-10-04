import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch, { api, usePostForm } from "../../app/hooks";

export const ExpensesAdd = createAsyncThunk(
    "ExpensesAdd/ExpensesAdd",
    async ({ data }, { getState }) => {
        console.log(data);
        const { user, token } = getState().loginInfo;
        const response = await fetch(
            `${api}/user/expense_categories?user_id=${user._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;
    }
);

export const ExpensesUpdate = createAsyncThunk(
    "ExpensesUpdate/ExpensesUpdate",
    async ({ data, id }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const response = await fetch(
            `${api}/user/expense_categories/${id}?user_id=${user._id}&_method=PUT`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;
    }
);

export const ExpensesDelete = createAsyncThunk(
    "ExpensesDelete/ExpensesDelete",
    async (
        { expense, publisher_id, book_id, expense_list_id },
        { getState }
    ) => {
        const { user, token } = getState().loginInfo;
        const data = {
            expense,
            publisher_id,
            book_id,
            expense_list_id,
        };
        console.log(data);

        const response = await fetch(
            `${api}/user/expense_categories/delete_expense?user_id=${user._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;

        // const result = await usePostForm({
        //   url: `expenses/${id}?expense_category_id=${expense_category_id}`,
        //   method: "DELETE",
        //   token: token,
        // });
        // return result;
    }
);

export const GetExpensesList = createAsyncThunk(
    "GetExpensesList/GetExpensesList",
    async ({ book_id, publisher_id }, { getState }) => {
        const { user, token } = getState().loginInfo;
        console.log({ book_id, publisher_id });
        const result = await useFetch({
            url: `expense_categories?user_id=${user._id}&publisher_id=${publisher_id}&book_id=${book_id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const GetExpensesDetail = createAsyncThunk(
    "GetExpensesDetail/GetExpensesDetail",
    async ({ book_id, publisher_id, id }, { getState }) => {
        console.log("id", id);
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `expense_categories/${id}?user_id=${user._id}&publisher_id=${publisher_id}&book_id=${book_id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
