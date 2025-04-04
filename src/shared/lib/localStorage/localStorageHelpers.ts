import {CityWeather} from "@/entities/City/model/types/city";

const LS_KEY = 'favoriteCities';

export const saveFavoritesToLS = (cities: CityWeather[]) => {
    const favorites = cities.filter(c => c.isFavorite);
    localStorage.setItem(LS_KEY, JSON.stringify(favorites));
};


