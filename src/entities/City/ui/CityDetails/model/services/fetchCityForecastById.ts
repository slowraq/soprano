import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { ForecastResponse } from '../types/forecast';

export const fetchCityForecastById = createAsyncThunk<
    ForecastResponse,
    string | undefined,
    { state: RootState; rejectValue: string }
>(
    'city/fetchCityForecast',
    async (cityId, thunkAPI) => {
        try {
            const response = await $api.get('/forecast', {
                params: {
                    q: `${cityId}`,
                },
            });

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('Ошибка при получении прогноза');
        }
    }
);
