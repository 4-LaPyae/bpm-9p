import {createSlice} from '@reduxjs/toolkit';
import {
    addCity,
    allCities,
    citiesDropdown,
    citiesOptions,
    deleteCity,
    updateCity,
} from './CityApi';

export const CityList = createSlice({
    name: 'Cities',
    initialState: {
        cities: [],
        cityOptions: [],
        cityDropdown: [],
        pagination: {},
        paginationData: {
            page: 1,
            limit: 10,
        },
    },
    reducers: {
        changePaginationData: (state, {payload}) => {
            state.paginationData = payload;
        },
        handleCities: (state, payload) => {
            const {data, ...rest} = payload;
            state.cities = data;
            state.pagination = rest;
        },
        handleCitiesOptions: (state, {payload}) => {
            state.cityOptions = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allCities.fulfilled, (state, {payload}) => {
                CityList.caseReducers.handleCities(state, payload);
            })
            .addCase(addCity.fulfilled, (state, {payload}) => {
                CityList.caseReducers.handleCities(state, payload);
            })
            .addCase(updateCity.fulfilled, (state, {payload}) => {
                CityList.caseReducers.handleCities(state, payload);
            })
            .addCase(deleteCity.fulfilled, (state, {payload}) => {
                CityList.caseReducers.handleCities(state, payload);
            })
            .addCase(citiesOptions.fulfilled, (state, {payload}) => {
                state.cityOptions = payload.data;
            })
            .addCase(citiesDropdown.fulfilled, (state, {payload}) => {
                state.cityDropdown = payload.data;
            });
    },
});
export const CitiesListSlice = CityList.reducer;
export const {changePaginationData, handleCitiesOptions} =
    CityList.actions;
