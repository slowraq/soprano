import cls from './ForecastList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ForecastItem } from '../../model/types/forecast';
import { memo, useMemo } from 'react';
import {getPeriodName} from "@/shared/lib/date/getPeriodName";
import {Card} from "@/shared/ui/Card/Card";

interface ForecastListProps {
    list: ForecastItem[];
    className?: string;
}

export const ForecastList = memo(({ list, className }: ForecastListProps) => {

    const renderedCards = useMemo(() => {
        return list.map((item) => {
            const icon = item.weather?.[0]?.icon;
            const description = item.weather?.[0]?.description ?? '';
            const temp = Math.round(item.main.temp);
            const time = item.dt_txt.split(' ')[1];
            const period = getPeriodName(time);
            return (
                <Card className={cls.card} key={item.dt_txt}>
                    <p className={cls.time}>{period}</p>
                    <li className={cls.temp}>
                        {temp}
                        <span className={cls.cels}>°C</span>
                    </li>
                    <li className={cls.picture}>
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt={description}
                            className={cls.icon}
                        />
                    </li>
                    <li className={cls.weather}>{description}</li>
                </Card>
            );
        });
    }, [list]);

    return (
        <div className={classNames(cls.ForecastList, {}, [className])}>
            {renderedCards}
        </div>
    );
});
