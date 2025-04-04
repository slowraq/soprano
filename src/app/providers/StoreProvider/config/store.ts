import { configureStore } from '@reduxjs/toolkit';
import {cityReducer} from "@/entities/City/model/slice/citySlice";
import {cityForecastReducer} from "@/entities/City/ui/CityDetails/model/slice/cityForecastSlice";

export const store = configureStore({
    reducer: {
        city: cityReducer,
        cityForecast: cityForecastReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
