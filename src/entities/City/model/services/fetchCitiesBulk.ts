import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { CityWeather } from '../types/city';
import {OpenWeatherResponse} from "@/entities/City";
import {mapWeatherToCityWeather} from "@/shared/lib/func/mapWeatherToCityWeather";

export const fetchCitiesBulk = createAsyncThunk<
    CityWeather[],
    string[],
    { rejectValue: string }
>(
    'city/fetchCitiesBulk',
    async (cityNames, thunkAPI) => {
        try {
            const requests = cityNames.map((name) =>
                $api.get('/weather', { params: { q: name } })
            );
            const responses = await Promise.all(requests);

            return responses.map((res) =>
                mapWeatherToCityWeather(res.data as OpenWeatherResponse)
            );

        } catch {
            return thunkAPI.rejectWithValue('Ошибка при загрузке избранных городов');
        }
    }
);
