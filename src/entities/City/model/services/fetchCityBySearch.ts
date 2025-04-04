import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { CityWeather } from '../types/city';
import { $api } from '@/shared/api/api';
import {getCitySearch} from "../selectors/getCitySelectors";
import {addQueryParams} from "@/shared/url/addQueryParams/addQueryParams";
import {mapWeatherToCityWeather} from "@/shared/lib/func/mapWeatherToCityWeather";
import {OpenWeatherResponse} from "../types/OpenWeatherResponse";

export const fetchCityBySearch = createAsyncThunk<
    CityWeather,
    void,
    { state: RootState; rejectValue: string }
>(
    'city/fetchCityBySearch',
    async (_, thunkAPI) => {
        const {getState} = thunkAPI
        const search = getCitySearch(getState()).trim();

        try {
            addQueryParams({search})
            const response = await $api.get('/weather', {
                params: { q: search },
            });
            const data: OpenWeatherResponse = response.data;
            return mapWeatherToCityWeather(data);
        } catch {
            return thunkAPI.rejectWithValue('Не удалось получить данные о городе');
        }
    }
);
