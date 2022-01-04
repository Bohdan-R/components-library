import classNames from 'classnames';
import React from 'react';
import { Colors } from '../../interfaces/types';
import styles from './RadioButton.module.scss';

interface RadioButtonProps {
    label: string;
    name: string;
    color: Colors;
    selectedRadio: string;
    onChange(value: string): void;
    className?: string;
}

function RadioButton({ label, name, color, selectedRadio, onChange, className }: RadioButtonProps) {
    const combineClassesLabel = classNames(styles.label, className);
    const combineClassesRadio = classNames(styles.radio, styles[color]);
    const combineClassesRadioCheck = classNames(styles.radioCheck, styles[color]);

    return (
        <label className={combineClassesLabel}>
            <input
                type="radio"
                value={label}
                name={name}
                className={styles.input}
                checked={selectedRadio === label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
            {label}
            <span className={combineClassesRadio}>
                <span className={combineClassesRadioCheck}></span>
            </span>
        </label>
    );
}

export default RadioButton;
