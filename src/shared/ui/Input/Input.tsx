import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        readonly,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper,mods,[className])}>
        <input
            type={type}
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
            readOnly={readonly}
            className={cls.input}
            {...otherProps}
            />
        </div>
    );
});
