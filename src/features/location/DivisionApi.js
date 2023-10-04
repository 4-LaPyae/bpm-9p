import {createAsyncThunk} from '@reduxjs/toolkit';

import useFetch from '../../app/hooks';

export const divisionOptions = createAsyncThunk(
    'divisionOptions/divisionOptions',
    async (_, {getState}) => {
        const {user, token} = getState().loginInfo;
        const result = await useFetch({
            url: `divisions_dropdown?user_id=${user._id}`,
            method: 'GET',
            token: token,
        });
        return result;
    }
);

export const allDivision = createAsyncThunk(
    'allDivision/allDivision',
    async ({page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `divisions?page=${page}&limit=${limit}`,
            method: 'GET',
            token: token,
        });
        return result;
    }
);

export const addDivision = createAsyncThunk(
    'addDivision/addDivision',
    async ({data, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `divisions?page=${page}&limit=${limit}`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);

export const updateDivision = createAsyncThunk(
    'updateDivision/updateDivision',
    async ({id, data, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `divisions/${id}?page=${page}&limit=${limit}&_method=PUT`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);
export const deleteDivision = createAsyncThunk(
    'deleteDivision/deleteDivision',
    async ({id, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `divisions/${id}?page=${page}&limit=${limit}`,
            method: 'DELETE',
            token: token,
        });
        return result;
    }
);
