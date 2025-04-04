import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ForecastTimeCard.module.scss';
import {memo} from 'react'

interface ForecastTimeCardProps {
    className?: string;
}

export const ForecastTimeCard = memo((props: ForecastTimeCardProps) => {
    const {className} = props;

    return (
        <div className={classNames(cls.ForecastTimeCard, {}, [className])}>

        </div>
    )
});
