import React from 'react';
import classNames from 'classnames/bind';
import { Position, Size } from '../../interfaces/types';
import styles from './Tooltip.module.scss';

interface TooltipProps {
    label: string | number;
    size: Size;
    position: Position;
    children: React.ReactChild | React.ReactNode;
}

function Tooltip({ label, size, position, children }: TooltipProps) {
    const combineClasses = classNames(styles.tooltip, styles[size], styles[position]);
    return (
        <div className={styles.container}>
            <span className={combineClasses}>{label}</span>
            {children}
        </div>
    );
}

export default Tooltip;
