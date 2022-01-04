import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { BtnVariant, Colors, SizeExtended, BtnType } from '../../interfaces/types';

type RootComponent = 'button' | 'a';

interface ButtonProps<T> {
    color: Colors;
    size: SizeExtended;
    variant: BtnVariant;
    type: BtnType;
    label?: string;
    disabled?: boolean;
    /* onClick?(value?: T): void; */
    onClick?(): void;
    as: RootComponent;
    className?: string;
    children?: React.ReactChild | React.ReactNode;
    rest?: T[];
}

function Button<T>({
    color,
    size,
    variant,
    type,
    label,
    disabled,
    onClick,
    as: RootComponent,
    children,
    className,
    ...rest
}: ButtonProps<T>) {
    const combineClasses = classNames(
        styles.button,
        styles[color],
        styles[size],
        styles[variant],
        className,
    );
    return (
        <RootComponent
            type={type}
            className={combineClasses}
            disabled={disabled}
            onClick={/* onClick ? () => onClick() : null */ onClick}
            {...rest}
        >
            {label}
            {children}
        </RootComponent>
    );
}

export default Button;
