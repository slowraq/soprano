export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Weather {
    temperature: number;
    feelsLike: number;
    description: string;
    icon: string;
    humidity: number;
    pressure: number;
    windSpeed: number;
}

export interface CityWeather {
    id: string;
    name: string;
    country: string;
    coordinates: Coordinates;
    date: number;
    weather: Weather;
    isFavorite: boolean;
}

export interface CityState {
    cities: CityWeather[];
    isLoading: boolean;
    search: string;
}
