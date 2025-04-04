import {memo, useEffect} from 'react'
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './MainPage.module.scss';
import {AddCityForm} from "@/features/addCityForm";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch";
import {initFavoriteCities} from "@/entities/City/model/services/initFavoriteCities";
import {CityList} from "@/entities/City";

interface MainPageProps {
    className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
    const {className} = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initFavoriteCities());
    }, [dispatch]);

    return (
        <div className={classNames(cls.MainPage, {}, [className] )}>
            <AddCityForm />
            <CityList/>
        </div>
    )
});
