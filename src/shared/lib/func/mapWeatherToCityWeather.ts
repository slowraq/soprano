import {CityWeather} from "@/entities/City";
import {OpenWeatherResponse} from "@/entities/City";

export const mapWeatherToCityWeather = (data :OpenWeatherResponse): CityWeather => ({
    id: `${data.name}-${data.sys.country}`,
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
    isFavorite: false,
    date: data.dt,
});
