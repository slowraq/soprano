import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './AddCityForm.module.scss'
import {memo, useCallback} from 'react'
import {cityActions} from "@/entities/City/model/slice/citySlice";
import {useSelector} from "react-redux";
import {getCitySearch} from "@/entities/City/model/selectors/getCitySelectors";
import {fetchCityBySearch} from "@/entities/City/model/services/fetchCityBySearch";
import {Input} from "@/shared/ui/Input/Input";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch";
import {Card} from "@/shared/ui/Card/Card";
import SearchIcon from '@/shared/assets/search-icon.svg';

interface AddCityForm {
    className?: string;
}

export const AddCityForm = memo((props: AddCityForm) => {
    const {className} = props;
    const dispatch = useAppDispatch();
    const search = useSelector(getCitySearch);

    const onChange = useCallback((value: string) => {
        dispatch(cityActions.setSearch(value));
    }, [dispatch]);

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                await dispatch(fetchCityBySearch()).unwrap();
                dispatch(cityActions.setSearch(''));
            } catch (e) {
                console.log(e, 'Ошибка при запросе')
            }
        },
        [dispatch]
    );

    return (
        <form
            onSubmit={onSubmit}
            className={classNames(cls.AddCityForm, {}, [className])}
        >
                <Input
                    className={cls.search}
                    value={search}
                    onChange={onChange}
                    placeholder="Введите город"
                />
            <Button
                 className={cls.iconBtn}
                type="submit"
                theme={ButtonTheme.GREEN}>
                <img
                    className={cls.icon}
                    src={SearchIcon}
                    alt={'Поиск'} height='25px' />
            </Button>
        </form>
    )
});
