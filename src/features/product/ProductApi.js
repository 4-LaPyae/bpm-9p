import {createAsyncThunk} from '@reduxjs/toolkit';

import useFetch, {usePostForm} from '../../app/hooks';

export const allProduct = createAsyncThunk(
    'allProduct/allProduct',
    async ({id, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `products?page=${page}&limit=${limit}&company_id=${id}`,
            method: 'GET',
            token: token,
        });
        return result;
    }
);

export const ProductAdd = createAsyncThunk(
    'ProductAdd/ProductAdd',
    async ({data, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `products?page=${page}&limit=${limit}`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);

export const ProductUpdate = createAsyncThunk(
    'ProductUpdate/ProductUpdate',
    async ({data, id, page, limit}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `products/${id}?_method=PUT&page=${page}&limit=${limit}`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);

export const ProductDelete = createAsyncThunk(
    'ProductDelete/ProductDelete',
    async ({id, page, limit, company_id}, {getState}) => {
        const {token} = getState().loginInfo;
        const result = await useFetch({
            url: `products/${id}?page=${page}&limit=${limit}&company_id=${company_id}`,
            method: 'DELETE',
            token: token,
        });
        return result;
    }
);
