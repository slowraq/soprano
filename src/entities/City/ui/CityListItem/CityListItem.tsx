import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './CityListItem.module.scss';
import {HTMLAttributeAnchorTarget, memo} from 'react'
import {CityWeather} from "../../model/types/city";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch";
import {cityActions} from "../../model/slice/citySlice";
import {Card} from "@/shared/ui/Card/Card";
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {RoutePath} from "@/shared/config/routeConfig/routeConfig";

interface CityListItemProps {
    className?: string;
    city: CityWeather;
    target?: HTMLAttributeAnchorTarget;
}

export const CityListItem = memo((props: CityListItemProps) => {
    const {className, city, target} = props;
    const dispatch = useAppDispatch();

    const onToggleFavorite = () => {
        dispatch(cityActions.toggleFavorite(city.id));
    };

    const onRemove = () => {
        dispatch(cityActions.removeCity(city.id));
    };

    const dateObj = new Date(city.date * 1000);

    const formattedDate = [
        dateObj.getDate().toString().padStart(2, '0'),
        (dateObj.getMonth() + 1).toString().padStart(2, '0'),
        dateObj.getFullYear()
    ].join('/');

    const temperature = (
        <div className={cls.temp}>
        {Number.isFinite(city.weather.temperature) ? (
            <>
                {Math.round(city.weather.temperature)}
                <span className={cls.degree}>°C</span>
            </>
        ) : (
            '—'
        )}
    </div>
    )

    return (
        <Card className={classNames(cls.CityCard, {}, [className])}>
            <div className={cls.actions}>
                <button className={cls.icon} onClick={onToggleFavorite}>
                    {city.isFavorite ? '❤️' : '🤍'}
                </button>
                <button className={cls.icon} onClick={onRemove}>✕</button>
            </div>
            <AppLink
                target={target}
                to={RoutePath.city_details + city.id}>
                <div className={cls.infoTop}>
                <img
                    className={cls.weatherIcon}
                    src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`}
                    alt={city.weather.description}
                />
                <div className={cls.cityName}>
                    <p>{city.name}, {city.country}</p>
                    <p>{formattedDate}</p>
                </div>
            </div>
            {temperature}
            <p className={cls.desc}>{city.weather.description}</p>
            </AppLink>
        </Card>

    )
});
