import React from 'react';
import classNames from 'classnames';
import styles from './InputField.module.scss';
import { Colors, Size, InputType } from '../../interfaces/types';

type RootComponent = 'input' | 'textarea';

interface InputFieldProps {
    color: Colors;
    size: Size;
    label: string;
    value: string | number;
    type: InputType;
    rows?: number;
    classNameInput?: string;
    classNameLabel?: string;
    as: RootComponent;
    onChange(value: string | number): void;
}

function InputField({
    color,
    size,
    label,
    value,
    type,
    rows,
    classNameInput,
    classNameLabel,
    as: RootComponent,
    onChange,
}: InputFieldProps) {
    const combineInputClasses = classNames(
        styles.input,
        styles[color],
        styles[size],
        classNameInput,
    );

    const combineLabelClasses = classNames(
        styles.label,
        styles[color],
        styles[size],
        classNameLabel,
    );

    return (
        <div className={styles.wrap}>
            <RootComponent
                id={label}
                type={type}
                placeholder=" "
                value={value}
                rows={rows}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    onChange(e.target.value)
                }
                className={combineInputClasses}
            />
            <label htmlFor={label} className={combineLabelClasses}>
                {label}
            </label>
        </div>
    );
}

export default InputField;
