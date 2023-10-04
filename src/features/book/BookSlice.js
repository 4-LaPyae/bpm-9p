import { createSlice } from "@reduxjs/toolkit";
import {
    allBook,
    BookAdd,
    BookDelete,
    BookUpdate,
    ExpensesAdd,
    GetBookExpenses,
} from "./BookApi";
import { checkToken } from "../../app/helper/checkToken";

export const BookList = createSlice({
    name: "Book",
    initialState: {
        books: null,
        getStatus: null,
        bookStatus: null,
        deleteStatus: null,
        expenses: [],
        pagination: {},
        paginationData: {
            page: 1,
            limit: 10,
        },
    },
    reducers: {
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        handleBook: (state, payload) => {
            console.log({ payload });
            const { data, ...rest } = payload;
            state.books = data;
            state.pagination = rest;

            // console.log("book", state.books);
        },
        resetBook: (state) => {
            console.log("reset book clicked.");
            state.books = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allBook.pending, (state, { payload }) => {
                state.getStatus = true;
            })
            .addCase(allBook.fulfilled, (state, { payload }) => {
                state.getStatus = false;
                BookList.caseReducers.handleBook(state, payload);
                // console.log("all book list", payload);
            })
            .addCase(BookAdd.pending, (state, { payload }) => {
                state.bookStatus = "pending";
            })
            .addCase(BookAdd.fulfilled, (state, { payload }) => {
                state.bookStatus = "success";
                BookList.caseReducers.handleBook(state, payload);
            })
            .addCase(BookUpdate.pending, (state, { payload }) => {
                state.bookStatus = "pending";
            })
            .addCase(BookUpdate.fulfilled, (state, { payload }) => {
                state.bookStatus = "success";
                state.books = state.books.map((book) => {
                    console.log({ book });
                    console.log({ payload });
                    if (book._id === payload.book._id) {
                        return payload.book;
                    } else {
                        return book;
                    }
                });
            })
            .addCase(BookDelete.pending, (state, { payload }) => {
                state.deleteStatus = "pending";
            })
            .addCase(BookDelete.fulfilled, (state, { payload }) => {
                console.log({ payload });
                state.deleteStatus = "success";
                BookList.caseReducers.handleBook(state, payload);
            })
            .addCase(
                GetBookExpenses.fulfilled,
                (state, { payload }) => {
                    state.expenses = payload.book;
                }
            );
    },
});
export const BookSlice = BookList.reducer;
export const { changePaginationData, resetBook } = BookList.actions;
