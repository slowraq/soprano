import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './CityDetailsPage.module.scss';
import {memo, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch";
import {getCityForecastById} from "@/entities/City/ui/CityDetails/model/selectors/getCityForecast";
import {useSelector} from "react-redux";
import {fetchCityForecastById} from "@/entities/City/ui/CityDetails/model/services/fetchCityForecastById";
import {CurrentWeatherCard, ForecastList} from "@/entities/City";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {RoutePath} from "@/shared/config/routeConfig/routeConfig";

interface CityDetailsPageProps {
    className?: string;
}

 const CityDetailsPage = memo((props: CityDetailsPageProps) => {
    const {className} = props;
     const { id } = useParams<{ id: string }>();
     const dispatch = useAppDispatch();
     const city = useSelector(getCityForecastById(id!));

     useEffect(() => {
         if (!city && id) {
             dispatch(fetchCityForecastById(id));
         }
     }, [id, dispatch,city]);

    return (
        <div className={classNames(cls.CityDetailsPage, {}, [className])}>
            <AppLink to={RoutePath.main} className={cls.backIcon}>
                <MdOutlineArrowBackIosNew size={24} />
            </AppLink>
            <div className={cls.wrapper}>
                <p className={cls.current}>Текущая погода</p>
                {city?.list?.length > 0 && (
                    <CurrentWeatherCard
                        cityName={city.city.name}
                        forecastItem={city.list[0]}
                    />
                )}
                <p className={cls.current}>Прогноз на сутки</p>
                {city?.list && <ForecastList list={city.list} />}
            </div>
        </div>
    )
});

export default CityDetailsPage;
