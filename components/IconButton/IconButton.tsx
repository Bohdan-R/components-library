import React from 'react';
import classNames from 'classnames/bind';
import { AiFillDelete, AiFillEdit, AiOutlineClose } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { GiCancel } from 'react-icons/gi';
import { IconBtnVariant, Size, BtnType } from '../../interfaces/types';
import styles from './IconButton.module.scss';

interface IconButtonProps {
    variant: IconBtnVariant;
    size: Size;
    type: BtnType;
    className?: string;
    onClick?(): void;
}

function IconButton({ className, variant, size, type, onClick }: IconButtonProps) {
    const combineClassesBtn = classNames(styles.btn, styles[variant], styles[size], className);
    const combineClassesIcon = classNames(styles.icon, styles[variant], styles[size]);

    const BtnIcon = {
        close: <AiOutlineClose className={combineClassesIcon} />,
        edit: <AiFillEdit className={combineClassesIcon} />,
        delete: <AiFillDelete className={combineClassesIcon} />,
        add: <GoPlus className={combineClassesIcon} />,
        confirm: <FaCheck className={combineClassesIcon} />,
        cancel: <GiCancel className={combineClassesIcon} />,
    };

    return (
        <button type={type} className={combineClassesBtn} onClick={onClick}>
            {BtnIcon[variant]}
        </button>
    );
}

export default IconButton;
