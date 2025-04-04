import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityState, CityWeather } from '../types/city';
import {saveFavoritesToLS} from "@/shared/lib/localStorage/localStorageHelpers";
import {fetchCityBySearch} from "@/entities/City/model/services/fetchCityBySearch";
import {fetchCitiesBulk} from "@/entities/City/model/services/fetchCitiesBulk";

const initialState: CityState = {
    cities: [],
    isLoading: false,
    search: '',
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        addCity(state, action: PayloadAction<CityWeather>) {
            state.cities.push(action.payload);
        },
        removeCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(city => city.id !== action.payload);

            const updatedFavorites = state.cities
                .filter(city => city.isFavorite)
                .map(city => city.name);

            localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));        },
        toggleFavorite(state, action: PayloadAction<string>) {
            const city = state.cities.find(c => c.id === action.payload);
            if (city) {
                city.isFavorite = !city.isFavorite;
                saveFavoritesToLS(state.cities);
            }
            const favorites = state.cities
                .filter(c => c.isFavorite)
                .map(c => c.name);

            localStorage.setItem('favoriteCities', JSON.stringify(favorites));

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCityBySearch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCityBySearch.fulfilled, (state, action) => {
                state.isLoading = false;

                const alreadyExists = state.cities.some(
                    (city) => city.name === action.payload.id
                );

                if (!alreadyExists) {
                    state.cities.push(action.payload);
                }
            })
            .addCase(fetchCityBySearch.rejected, (state, action) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchCitiesBulk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCitiesBulk.fulfilled, (state, action: PayloadAction<CityWeather[]>) => {
                state.isLoading = false;

                const newCities = action.payload.filter(
                    (newCity) => !state.cities.some((existing) => existing.id === newCity.id)
                );

                state.cities.push(...newCities);
            })
            .addCase(fetchCitiesBulk.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { actions: cityActions, reducer: cityReducer } = citySlice;
