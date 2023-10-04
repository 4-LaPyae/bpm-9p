import { createSlice } from "@reduxjs/toolkit";
import {
    GetExpensesList,
    GetExpensesDetail,
    ExpensesAdd,
    ExpensesUpdate,
} from "./expensesApi";

export const ExpensesList = createSlice({
    name: "Expenses",
    initialState: {
        expenses: [],
        expensesList: [],
        expensesDetail: [],
        status: null,
        listStatus: null,
        expensesAddStatus: null,
        expensesUpdateStatus: null,
    },
    reducers: {
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        resetExpenseDetail: (state) => {
            state.expensesDetail = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetExpensesList.fulfilled, (state, { payload }) => {
                state.expensesList = payload;
                state.listStatus = "success";
            })
            .addCase(GetExpensesList.pending, (state, { payload }) => {
                state.listStatus = "pending";
            })
            .addCase(GetExpensesDetail.fulfilled, (state, { payload }) => {
                console.log(payload, "get expenses detail");
                state.expensesDetail = payload;
                state.status = "success";
            })
            .addCase(GetExpensesDetail.pending, (state) => {
                state.status = "pending";
            })
            .addCase(ExpensesAdd.pending, (state) => {
                state.expensesAddStatus = true;
            })
            .addCase(ExpensesAdd.fulfilled, (state) => {
                state.expensesAddStatus = false;
            })
            .addCase(ExpensesUpdate.pending, (state) => {
                state.expensesUpdateStatus = true;
            })
            .addCase(ExpensesUpdate.fulfilled, (state) => {
                state.expensesUpdateStatus = false;
            });
    },
});
export const ExpensesSlice = ExpensesList.reducer;
export const { changePaginationData, resetExpenseDetail } =
    ExpensesList.actions;
