import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch, { api } from "../../app/hooks";

export const dropdownCourisers = createAsyncThunk(
    "dropdownCourisers/dropdownCourisers",
    async (_, { getState }) => {
        const { user, token, publisher } = getState().loginInfo;
        const result = await useFetch({
            url: `courierDropdown?user_id=${user._id}&publisher_id=${publisher[0]._id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const getCouriersList = createAsyncThunk(
    "getCouriersList/getCouriersList",
    async ({ page, limit, id, filterName }, { getState }) => {
        const { token, user } = getState().loginInfo;
        const result = useFetch({
            url: `couriers?user_id=${user._id}&page=${page}&limit=${limit}&publisher_id=${id}&filterName=${filterName}`,
            method: "GET",
            token: token,
        });
        // console.log(result);
        return result;
    }
);

export const addCourier = createAsyncThunk(
    "addCourier/addCourier",
    async ({ data }, { getState }) => {
        const { token, user } = getState().loginInfo;
        console.log({ data });
        const response = await fetch(
            `${api}/user/couriers?user_id=${user._id}`,
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
        console.log({ result });
        return result;
    }
);

export const updateCourier = createAsyncThunk(
    "updateCourier/updateCourier",
    async ({ data, id }, { getState }) => {
        const { token, user } = getState().loginInfo;
        console.log(data);
        const response = await fetch(
            `${api}/user/couriers/${id}?user_id=${user._id}&_method=PUT`,
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

export const CourierDelete = createAsyncThunk(
    "CourierDelete/CourierDelete",
    async ({ id, publisher_id }, { getState }) => {
        const { token, user } = getState().loginInfo;
        const result = await useFetch({
            url: `couriers/${id}?user_id=${user._id}&publisher_id=${publisher_id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);
