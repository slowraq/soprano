import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { getCityById } from '../selectors/getCitySelectors';
import {ForecastResponse} from "../../ui/CityDetails/model/types/forecast";

export const fetchCityForecast = createAsyncThunk<
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
