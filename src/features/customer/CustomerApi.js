import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch, { api, usePostForm } from "../../app/hooks";

export const allCustomers = createAsyncThunk(
    "allCustomers/allCustomers",
    async ({ page, limit, filterName, divisionId }, { getState }) => {
        const { token, user, publisher } = getState().loginInfo;
        const result = useFetch({
            url: `customers?user_id=${user._id}&publisher_id=${publisher[0]._id}&filterName=${filterName}&division_id=${divisionId}&limit=${limit}&page=${page}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
export const getCustomerList = createAsyncThunk(
    "getCustomerList/getCustomerList",
    async ({ publisher_id, phNumber }, { getState }) => {
        const { token, user } = getState().loginInfo;
        const result = useFetch({
            url: `customers/${publisher_id}?user_id=${user._id}&phone=${phNumber}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
export const addCustomer = createAsyncThunk(
    "addCustomer/addCustomer",
    async ({ data }, { getState }) => {
        const { token, user } = getState().loginInfo;
        console.log(data);
        const response = await fetch(
            `${api}/user/customers?user_id=${user._id}`,
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
        // const result = usePostForm({
        //   url: `users?admin_id=${admin._id}`,
        //   method: "POST",
        //   token: token,
        //   data: data,
        // });
        // return result;
    }
);
export const updateCustomer = createAsyncThunk(
    "updateCustomer/updateCustomer",
    async ({ data, id }, { getState }) => {
        const { token, user } = getState().loginInfo;
        console.log(data);
        const response = await fetch(
            `${api}/user/customers/${id}?user_id=${user._id}&_method=PUT`,
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
        // const result = usePostForm({
        //   url: `users?admin_id=${admin._id}`,
        //   method: "POST",
        //   token: token,
        //   data: data,
        // });
        // return result;
    }
);

export const deleteCustomer = createAsyncThunk(
    "deleteCustomer/deleteCustomer",
    async ({ id }, { getState }) => {
        console.log(id);
        const { token, admin } = getState().loginInfo;
        const result = useFetch({
            url: `customers/${id}?admin_id=${admin._id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const defaultAddress = createAsyncThunk(
    "defaultAddress/defaultAddress",
    async ({ data }, { getState }) => {
        const { token, user } = getState().loginInfo;
        console.log(data);
        const response = await fetch(
            `${api}/user/customers/setDefaultAddress?user_id=${user._id}`,
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
