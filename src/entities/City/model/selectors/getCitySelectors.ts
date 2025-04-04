import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getCitySearch = (state: RootState) => state.city.search ?? '';
export const getCityList = (state: RootState) => state.city.cities || [];
