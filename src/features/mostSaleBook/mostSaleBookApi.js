import { createAsyncThunk } from "@reduxjs/toolkit";

import useFetch from "../../app/hooks";

export const MostSaleBookList = createAsyncThunk(
    "MostSaleBookList/MostSaleBookList",
    async (
        { page, limit, start, end, bookName, id },
        { getState }
    ) => {
        const { user, token } = getState().loginInfo;
        const result = await useFetch({
            url: `mostSaleBook?user_id=${user._id}&start='2023-07-14'&end='2023-07-14'&page=1&limit=10&book_name='test4'&publisher_id=${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
