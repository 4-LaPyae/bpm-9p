import {createSlice} from '@reduxjs/toolkit';
import {
    allProduct,
    ExpensesAdd,
    ProductAdd,
    ProductDelete,
    ProductUpdate,
} from './ProductApi';

export const ProductList = createSlice({
    name: 'Product',
    initialState: {
        products: [],
        pagination: {},
        paginationData: {
            page: 1,
            limit: 5,
        },
    },
    reducers: {
        changePaginationData: (state, {payload}) => {
            state.paginationData = payload;
        },
        handleProduct: (state, payload) => {
            const {data, ...rest} = payload;
            console.log(payload);
            state.products = data;
            state.pagination = rest;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allProduct.fulfilled, (state, {payload}) => {
                console.log('get');
                ProductList.caseReducers.handleProduct(
                    state,
                    payload
                );
            })
            .addCase(ProductAdd.fulfilled, (state, {payload}) => {
                ProductList.caseReducers.handleProduct(
                    state,
                    payload
                );
            })
            .addCase(ProductUpdate.fulfilled, (state, {payload}) => {
                state.products = state.products.map((product) => {
                    if (product.id === payload.product[0].id) {
                        return payload.product[0];
                    } else {
                        return product;
                    }
                });
            })
            .addCase(ProductDelete.fulfilled, (state, {payload}) => {
                ProductList.caseReducers.handleProduct(
                    state,
                    payload
                );
            });
    },
});
export const ProductSlice = ProductList.reducer;
export const {changePaginationData} = ProductList.actions;
