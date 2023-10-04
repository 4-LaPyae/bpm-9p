import { createSlice, current } from "@reduxjs/toolkit";
import {
    PrintAllInvoices,
    addInvoiceSaleBook,
    addInvoices,
    allInvoiceSaleBook,
    allInvoices,
    searchBook,
    updateInvoiceSaleBook,
    updateInvoices,
} from "./invoicesApi";
import { checkToken } from "../../app/helper/checkToken";

export const Invoices = createSlice({
    name: "invoices",
    initialState: {
        getStatus: null,
        invoicesAll: [],
        invoices: [],
        hideInvoices: [],
        saleBooks: null,
        searchBooks: [],
        selectedBooks: [],
        selectedInvoices: [],
        returnQty: 0,
        returnStatus: false,
        damageStatus: false,
        oneTimeReturnBooks: [],
        oneTimeDamageBooks: [],
        tax: 0,
        dis: 0,
        resellerDiscount: 0,
        pagination: {
            page: 1,
            rowPerPages: 20,
            total: 0,
        },
    },
    reducers: {
        storeReturn: (state, { payload }) => {
            console.log(payload);
            state.returnStatus = true;
            state.returnQty = payload.qty;
            state.damageStatus = payload.damage;
            if (!state.oneTimeReturnBooks) {
                state.oneTimeReturnBooks = [];
            }
            state.oneTimeReturnBooks.push({
                image: payload.image,
                return: Number(payload.qty),
                remark: payload.remark,
                user_id: payload.user_id,
                book_id: payload.book_id,
                return_date: payload.return_date,
            });
        },
        storeDamage: (state, { payload }) => {
            state.returnStatus = true;
            state.returnQty = payload.qty;
            state.damageStatus = payload.damage;
            if (!state.oneTimeDamageBooks) {
                state.oneTimeDamageBooks = [];
            }
            state.oneTimeDamageBooks.push({
                image: payload.image,
                damage: Number(payload.qty),
                remark: payload.remark,
                user_id: payload.user_id,
                book_id: payload.book_id,
                damage_date: payload.damage_date,
            });
        },
        resetOneTimeBook: (state) => {
            state.oneTimeDamageBooks = [];
            state.oneTimeReturnBooks = [];
        },
        resetReturnStatus: (state) => {
            state.returnStatus = false;
        },
        ResetStoreDamage: (state) => {
            state.returnStatus = false;
            state.damage = false;
            state.image = null;
            state.returnRemark = null;
            state.returnQty = 0;
        },
        storeTax: (state, { payload }) => {
            state.tax = Number(payload.tax);
        },
        storeDis: (state, { payload }) => {
            state.dis = Number(payload.discount);
        },
        resetTax: (state) => {
            state.tax = 0;
        },
        storeResellerDiscount: (state, { payload }) => {
            state.resellerDiscount = Number(payload.resDiscount);
        },
        resetResellerDiscount: (state) => {
            state.resellerDiscount = 0;
        },
        handleInvoices: (state, payload) => {
            const { data, ...rest } = payload;
            state.invoices = data;
            state.pagination = rest;
        },
        handleNewInvoices: (state, { payload }) => {
            console.log("payload", payload);
            const { data, ...rest } = payload;
            state.invoices = data;
            state.pagination = rest;
        },
        handleCompleteInvoices: (state, { payload }) => {
            console.log(payload);
            state.hideInvoices = state.invoicesAll.filter(
                (item) => !payload.some((obj) => obj._id === item._id)
            );
        },
        removeHideInvoices: (state) => {
            state.hideInvoices = [];
            state.selectedInvoices = [];
        },
        addSelectedBook: (state, { payload }) => {
            console.log(payload);
            state.selectedBooks = payload;
        },
        clearSearchBook: (state, { payload }) => {
            state.searchBooks = [];
        },
        clearInvoices: (state, { payload }) => {
            state.invoices = [];
        },
        clearSelectedBook: (state, { payload }) => {
            state.selectedBooks = [];
            state.saleBooks = null;
        },
        addSelectedInvoices: (state, { payload }) => {
            state.selectedInvoices = payload;
        },
        clearSelectedInvoice: (state, { payload }) => {
            state.selectedInvoices = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allInvoices.pending, (state, { payload }) => {
                state.getStatus = "pending";
            })
            .addCase(allInvoices.fulfilled, (state, { payload }) => {
                state.getStatus = "success";
                checkToken(payload);
                Invoices.caseReducers.handleInvoices(state, payload);
            })
            .addCase(addInvoices.fulfilled, (state, { payload }) => {
                state.invoices.unshift(payload.data);
            })
            .addCase(
                updateInvoices.fulfilled,
                (state, { payload }) => {
                    Invoices.caseReducers.handleInvoices(
                        state,
                        payload
                    );
                }
            )
            .addCase(searchBook.fulfilled, (state, { payload }) => {
                state.searchBooks = payload.data;
            })
            .addCase(
                PrintAllInvoices.fulfilled,
                (state, { payload }) => {
                    state.invoicesAll = payload.data;
                }
            )
            .addCase(
                allInvoiceSaleBook.fulfilled,
                (state, { payload }) => {
                    state.selectedBooks = payload.data
                        ? payload.data.books
                        : [];
                    state.saleBooks = payload.data;
                    // state.returnBooks = payload.data.books.returnBook;
                    // state.damageBooks = payload.data.books.damageBook;
                }
            );
    },
});
export const InvoicesSlice = Invoices.reducer;
export const {
    handleNewInvoices,
    addSelectedBook,
    clearSearchBook,
    clearSelectedBook,
    addSelectedInvoices,
    clearSelectedInvoice,
    clearInvoices,
    handleCompleteInvoices,
    removeHideInvoices,
    storeDamage,
    storeReturn,
    ResetStoreDamage,
    resetReturnStatus,
    storeTax,
    resetTax,
    storeResellerDiscount,
    resetResellerDiscount,
    storeDis,
    resetOneTimeBook,
} = Invoices.actions;
