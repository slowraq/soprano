import { createSlice } from '@reduxjs/toolkit';
import { ForecastResponse } from '../types/forecast';
import { fetchCityForecastById } from '../services/fetchCityForecastById';
import {getForecastsTimes} from "@/shared/utils/getFiltredForecastTimes";

interface CityForecastState {
    data: Record<string, ForecastResponse>; // по id города
    isLoading: boolean;
    error?: string;
}

const initialState: CityForecastState = {
    data: {},
    isLoading: false,
};

const times = ['06:00:00', '12:00:00','18:00:00', '23:00:00'];

export const cityForecastSlice = createSlice({
    name: 'cityForecast',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCityForecastById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCityForecastById.fulfilled, (state, action) => {
                const id = action.meta.arg!;
                state.data[id] = {...action.payload, list:getForecastsTimes(action.payload)}
                state.isLoading = false;
            })
            .addCase(fetchCityForecastById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const cityForecastReducer = cityForecastSlice.reducer;
