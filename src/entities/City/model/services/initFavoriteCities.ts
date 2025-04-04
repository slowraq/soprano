import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCitiesBulk } from './fetchCitiesBulk';

export const initFavoriteCities = createAsyncThunk(
    'city/initFavoriteCities',
    async (_, thunkAPI) => {
        const raw = localStorage.getItem('favoriteCities');
        if (!raw) return;

        const cityNames: string[] = JSON.parse(raw);
        await thunkAPI.dispatch(fetchCitiesBulk(cityNames));
    }
);
