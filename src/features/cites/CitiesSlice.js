import { createSlice } from "@reduxjs/toolkit";
import { Cities } from "./CitiesApi";
import { checkToken } from "../../app/helper/checkToken";

const citiesInitial = {
    cities: [],
};

export const CitiesData = createSlice({
    name: "cities",
    initialState: { ...citiesInitial },
    extraReducers: (builder) => {
        builder.addCase(Cities.fulfilled, (state, { payload }) => {
            state.cities = payload.townships;
        });
    },
});

export const citiesData = CitiesData.reducer;
