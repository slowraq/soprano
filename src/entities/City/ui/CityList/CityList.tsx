import {HTMLAttributeAnchorTarget, memo} from 'react';
import { useSelector } from 'react-redux';
import { getCityList } from '../../model/selectors/getCitySelectors';
import { CityListItem } from '@/entities/City/ui/CityListItem/CityListItem';
import cls from './CityList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface CityListProps {
    className?: string;
    target?: HTMLAttributeAnchorTarget;
}

export const CityList = memo(({ className, target}: CityListProps) => {
    const cities = useSelector(getCityList);

    return (
        <div className={classNames(cls.CityList, {}, [className])}>
            {cities.map((city) => (
                <CityListItem key={city.id} city={city} target={target}/>
            ))}
        </div>
    );
});
