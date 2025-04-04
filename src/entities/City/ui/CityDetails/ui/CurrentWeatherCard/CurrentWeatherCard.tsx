import cls from './CurrentWeatherCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    WiHumidity,
    WiStrongWind,
    WiBarometer,
    WiThermometer,
    WiDirectionUp,
    WiDirectionDown,
} from 'react-icons/wi';
import image from '@/shared/assets/city.jpg';
import { ForecastItem } from '../../model/types/forecast';
import {Card} from "@/shared/ui/Card/Card";

interface CurrentWeatherCardProps {
    forecastItem: ForecastItem;
    className?: string;
    cityName: string;
}

export const CurrentWeatherCard = ({ forecastItem, className, cityName }: CurrentWeatherCardProps) => {
    const {
        main: { temp, feels_like, pressure, humidity },
        weather,
        wind,
    } = forecastItem;

    const icon = weather?.[0]?.icon;
    const description = weather?.[0]?.description ?? '';


    return (
        <Card className={classNames(cls.CurrentWeatherCard, {}, [className])}>
            <div className={cls.weatherContent}>
                <div className={cls.imageContainer}>
                    <img className={cls.cityImage} src={image} alt="city" />
                </div>

                <div className={cls.mainInfo}>
                    <h2 className={cls.cityName}>{cityName}</h2>
                    <div className={cls.weatherIconWrap}>
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                            alt={description}
                        />
                        <p className={cls.temp}>
                            {Math.round(temp)}<span className={cls.c}>°C</span>
                        </p>
                    </div>
                    <p className={cls.description}>{description}</p>
                </div>

                <div className={cls.detailedInfo}>
                    <p className={cls.feelsWrap}>
                        <WiThermometer size={18} /> <strong>Ощущается как:</strong>{' '}
                        {Math.round(feels_like)}°C
                    </p>
                    <div className={cls.temperature}>
                        <p>
                            <WiDirectionUp size={18} color="red" />
                            {Math.round(temp + 2)}°C
                        </p>
                        <p>
                            <WiDirectionDown size={18} color="blue" />
                            {Math.round(temp - 2)}°C
                        </p>
                    </div>
                    <div className={cls.wrapdet}>
                        <p>
                            <WiHumidity size={18} /> <strong>Влажность:</strong> {humidity}%
                        </p>
                        <p>
                            <WiStrongWind size={18} /> <strong>Ветер:</strong> {wind.speed} м/с
                        </p>
                        <p>
                            <WiBarometer size={18} /> <strong>Давление:</strong> {pressure} гПа
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};
