import React from 'react';
import classNames from 'classnames';
import styles from './InputField.module.scss';
import { Colors, Size, InputType, AutoComplete } from '../../interfaces/types';

type RootComponent = 'input' | 'textarea';

interface InputFieldProps {
  color: Colors;
  size: Size;
  label?: string;
  value: string | number;
  type: InputType;
  rows?: number;
  placeholder?: string;
  autoComplete?: AutoComplete;
  classNameInput?: string;
  classNameLabel?: string;
  as: RootComponent;
  onChange?(value: string | number): void;
  onClick?(): void;
}

function InputField({
  color,
  size,
  label,
  value,
  type,
  rows,
  placeholder,
  autoComplete,
  classNameInput,
  classNameLabel,
  as: RootComponent,
  onChange,
  onClick,
}: InputFieldProps) {
  const combineInputClasses = classNames(styles.input, styles[color], styles[size], classNameInput);

  const combineLabelClasses = classNames(styles.label, styles[color], styles[size], classNameLabel);

  return (
    <div className={styles.wrap}>
      <RootComponent
        id={label}
        type={type}
        placeholder={placeholder ? placeholder : ' '}
        value={value}
        rows={rows}
        autoComplete={autoComplete ? autoComplete : 'off'}
        onChange={
          onChange ? (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value) : null
        }
        className={combineInputClasses}
        onClick={onClick}
      />
      {label && (
        <label htmlFor={label} className={combineLabelClasses}>
          {label}
        </label>
      )}
    </div>
  );
}

export default InputField;
