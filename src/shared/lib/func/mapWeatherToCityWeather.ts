import {CityWeather} from "@/entities/City";
import {OpenWeatherResponse} from "@/entities/City";
import {getIsFavorite} from "@/shared/utils/getIsFaovite";

export const mapWeatherToCityWeather = (data :OpenWeatherResponse): CityWeather => ({
    id: data.name,
    name: data.name,
    country: data.sys.country,
    coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
    },
    weather: {
        temperature: data.main?.temp,
        feelsLike: data.main?.feels_like,
        description: data.weather?.[0]?.description ?? '',
        icon: data.weather?.[0]?.icon ?? '01d',
        humidity: data.main?.humidity,
        pressure: data.main?.pressure,
        windSpeed: data.wind?.speed,
    },
    isFavorite: getIsFavorite(data.name),
    date: data.dt,
});
