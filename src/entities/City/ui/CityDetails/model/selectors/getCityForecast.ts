import {RootState} from "@/app/providers/StoreProvider/config/store";

export const getCityForecastById = (id: string) => (state: RootState)  =>
    state.cityForecast.data[id];
