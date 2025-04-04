import { RouteProps } from 'react-router-dom';
import {MainPage} from "@/pages/MainPage";
import {CityDetailsPage} from "@/pages/CityDetailsPage";


export type AppRoutesProps = RouteProps

export enum AppRoutes {
    MAIN = 'main',
    CITY_DETAILS = 'city_details',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CITY_DETAILS]: '/city/',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.CITY_DETAILS]: {
        path: `${RoutePath.city_details}:id`,
        element: <CityDetailsPage />,
    },
};
