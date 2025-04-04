import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getCitySearch = (state: RootState) => state.city.search ?? '';
export const getCityList = (state: RootState) => state.city.cities || [];
export const getCityById = (id: string) => (state: RootState)  =>
    state.city.cities.find((city) => city.id === id);
