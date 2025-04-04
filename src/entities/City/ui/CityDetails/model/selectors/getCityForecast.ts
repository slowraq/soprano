import {RootState} from "@/app/providers/StoreProvider/config/store";

export const getCityForecastById = (id: string) => (state: RootState)  =>
    state.cityForecast.data[id];

export const getCityForecastLoading = (state: RootState) =>
    state.cityForecast.isLoading ?? false;
