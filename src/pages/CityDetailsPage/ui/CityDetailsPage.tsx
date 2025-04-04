import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './CityDetailsPage.module.scss';
import {memo, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch";
import {getCityForecastById} from "@/entities/City/ui/CityDetails/model/selectors/getCityForecast";
import {useSelector} from "react-redux";
import {fetchCityForecastById} from "@/entities/City/ui/CityDetails/model/services/fetchCityForecastById";
import {CurrentWeatherCard} from "@/entities/City/ui/CityDetails/ui/CurrentWeatherCard/CurrentWeatherCard";

interface CityDetailsPageProps {
    className?: string;
}

 const CityDetailsPage = memo((props: CityDetailsPageProps) => {
    const {className} = props;
     const { id } = useParams<{ id: string }>();
     const dispatch = useAppDispatch();
     const city = useSelector(getCityForecastById(id!));


     useEffect(() => {
         if (id) {
             dispatch(fetchCityForecastById(id));
         }
     }, [id, dispatch]);

    return (
        <div className={classNames(cls.CityDetailsPage, {}, [className])}>
            {city?.list?.length > 0 && (
                <CurrentWeatherCard
                    cityName={city.city.name}
                    forecastItem={city.list[0]}
                />
            )}
        </div>
    )
});

export default CityDetailsPage;
