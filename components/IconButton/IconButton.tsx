import React from 'react';
import classNames from 'classnames/bind';
import { AiFillDelete, AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import styles from './IconButton.module.scss';
import { IconBtnVariant, Size, BtnType } from '../../interfaces/types';

interface IconButtonProps<T> {
    variant: IconBtnVariant;
    size: Size;
    type: BtnType;
    className?: string;
    /* onClick?(value?: T): void; */
    onClick?(): void;
}

function IconButton<T>({ className, variant, size, type, onClick }: IconButtonProps<T>) {
    const combineClassesBtn = classNames(styles.btn, styles[variant], styles[size], className);
    const combineClassesIcon = classNames(styles.icon, styles[variant], styles[size]);

    const BtnIcon = {
        close: <AiOutlineClose className={combineClassesIcon} />,
        edit: <AiFillEdit className={combineClassesIcon} />,
        delete: <AiFillDelete className={combineClassesIcon} />,
        add: <GoPlus className={combineClassesIcon} />,
        confirm: <FaCheck className={combineClassesIcon} />,
    };

    return (
        <button
            type={type}
            className={combineClassesBtn}
            onClick={/* onClick ? () => onClick(value) : null */ onClick}
        >
            {BtnIcon[variant]}
        </button>
    );
}

export default IconButton;
