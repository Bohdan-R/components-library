import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from './Select.module.scss';

const cx = classNames.bind(styles);

interface SelectProps<T> {
  label?: string;
  items: T[];
  selected: string;
  setSelected(value: string): void;
  className?: string;
}

function Select<T>({ label, items, selected, setSelected, className }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const combineClasses = classNames(styles.select, className);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={combineClasses}>
      <div
        ref={ref}
        className={cx('selectHeader', {
          disabled: !items,
        })}
        onClick={items ? () => setIsOpen(!isOpen) : null}
      >
        <span className={styles.selectLabel}>{selected ? selected : label}</span>
        <MdOutlineKeyboardArrowDown
          className={cx('selectIcon', {
            isOpen: isOpen === true,
          })}
        />
      </div>
      <div
        className={cx('selectContent', {
          isOpen: isOpen === true,
        })}
      >
        {items &&
          items.map((item, i) => (
            <div
              key={i}
              className={styles.selectItem}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setSelected(e.currentTarget.textContent);
                setIsOpen(false);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Select;
