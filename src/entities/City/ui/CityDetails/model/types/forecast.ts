export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    dt_txt: string;
}

export interface ForecastResponse {
    list: ForecastItem[];
    city: {
        name: string;
        country: string;
    };
}
