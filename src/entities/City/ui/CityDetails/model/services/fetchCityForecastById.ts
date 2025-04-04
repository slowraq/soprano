import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { ForecastResponse } from '../types/forecast';
import {getCityById} from "../../../../model/selectors/getCitySelectors";

export const fetchCityForecastById = createAsyncThunk<
    ForecastResponse,
    string | undefined,
    { state: RootState; rejectValue: string }
>(
    'city/fetchCityForecast',
    async (cityId, thunkAPI) => {

        const city = getCityById(cityId!)(thunkAPI.getState());

        if (!city) {
            return thunkAPI.rejectWithValue('Город не найден');
        }

        try {
            const response = await $api.get('/forecast', {
                params: {
                    q: `${city.name},${city.country}`,
                },
            });

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('Ошибка при получении прогноза');
        }
    }
);
