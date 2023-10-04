import {createAsyncThunk} from '@reduxjs/toolkit';

import useFetch from '../../app/hooks';

export const allCities = createAsyncThunk(
    'allCities/allCities',
    async ({page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `cities?page=${page}&limit=${limit}`,
            method: 'GET',
            token: token,
        });
        return result;
    }
);

export const addCity = createAsyncThunk(
    'addCity/addCity',
    async ({data, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `cities?page=${page}&limit=${limit}`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);

export const updateCity = createAsyncThunk(
    'updateCity/updateCity',
    async ({id, data, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `cities/${id}?page=${page}&limit=${limit}&_method=PUT`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);

export const deleteCity = createAsyncThunk(
    'deleteCity/deleteCity',
    async ({id, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `cities/${id}?page=${page}&limit=${limit}`,
            method: 'DELETE',
            token: token,
        });
        return result;
    }
);

export const citiesOptions = createAsyncThunk(
    'citiesOptions/citiesOptions',
    async ({id}, {getState}) => {
        const {user, token} = getState().loginInfo;
        const result = await useFetch({
            url: `cities/${id}?user_id=${user._id}`,
            method: 'GET',
            token: token,
        });
        console.log(result);
        return result;
    }
);

export const citiesDropdown = createAsyncThunk(
    'citiesDropdown/citiesDropdown',
    async (_, {getState}) => {
        const {user, token} = getState().loginInfo;
        const result = await useFetch({
            url: `cities_dropdown?user_id=${user._id}`,
            method: 'GET',
            token: token,
        });
        return result;
    }
);
