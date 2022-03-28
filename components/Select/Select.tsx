import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from './Select.module.scss';

const cx = classNames.bind(styles);

interface SelectProps<T> {
  label: string;
  items: T[];
  selected: string;
  setSelected(value: string): void;
}

function Select<T>({ label, items, selected, setSelected }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.select}>
      <div
        className={cx('selectHeader', {
          disabled: !items,
        })}
        onClick={items ? () => setIsOpen(!isOpen) : null}
      >
        {selected ? selected : label}
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
