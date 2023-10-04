import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const allInvoices = createAsyncThunk(
    "allInvoices/allInvoices",
    async (
        { page, limit, start, end, code, division, staff, status },
        { getState }
    ) => {
        const { user, token, publisher } = getState().loginInfo;
        const result = await useFetch({
            url: `invoices?user_id=${user._id}&publisher_id=${publisher[0]?._id}&limit=${limit}&page=${page}&start=${start}&end=${end}&invoice_code=${code}&division_id=${division}&staff=${staff}&status=${status}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addInvoices = createAsyncThunk(
    "addInvoices/addInvoices",
    async ({ data }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `invoices?user_id=${user._id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const updateInvoices = createAsyncThunk(
    "updateInvoices/updateInvoices",
    async ({ data, id }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `invoices/${id}?user_id=${user._id}&_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const allInvoiceSaleBook = createAsyncThunk(
    "allInvoiceSaleBook/allInvoiceSaleBook",
    async ({ id }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `sale_books?user_id=${user._id}&invoice_id=${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addInvoiceSaleBook = createAsyncThunk(
    "addInvoiceSaleBook/addInvoiceSaleBook",
    async ({ data }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `sale_books?user_id=${user._id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const updateInvoiceSaleBook = createAsyncThunk(
    "updateInvoiceSaleBook/updateInvoiceSaleBook",
    async ({ id, data }, { getState }) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `sale_books/${id}?user_id=${user._id}&_method=PUT`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const searchBook = createAsyncThunk(
    "searchBook/searchBook",
    async ({ search }, { getState }) => {
        const { user, token, publisher } = getState().loginInfo;
        const result = await useFetch({
            url: `bookLists?user_id=${user._id}&publisher_id=${publisher[0]?._id}&filter_name=${search}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addCompleteInvoices = createAsyncThunk(
    "addCompleteInvoices/addCompleteInvoices",
    async ({ data }, { getState }) => {
        console.log(data);
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `invoiceCompleted?user_id=${user._id}`,
            method: "POST",
            token: token,
            data: data,
        });
        return result;
    }
);

export const PrintAllInvoices = createAsyncThunk(
    "PrintAllInvoices/PrintAllInvoices",
    async (
        { start, end, code, division, staff, status },
        { getState }
    ) => {
        const { user, token, publisher } = getState().loginInfo;
        const result = await useFetch({
            url: `invoicePrintAll?user_id=${user._id}&publisher_id=${publisher[0]?._id}&start=${start}&end=${end}&invoice_code=${code}&division_id=${division}&staff=${staff}&status=${status}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
