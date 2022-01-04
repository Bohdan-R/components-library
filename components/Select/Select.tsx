import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from './Select.module.scss';
import { ICategory } from '../../interfaces/interfaces';

const cx = classNames.bind(styles);

interface SelectProps {
    label: string;
    items: ICategory[];
    selected: string;
    setSelected(value: string): void;
}

function Select({ label, items, selected, setSelected }: SelectProps) {
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
                    items.map(item => (
                        <div
                            key={item.id}
                            className={styles.selectItem}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                setSelected(e.currentTarget.textContent);
                                setIsOpen(false);
                            }}
                        >
                            {item.category}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Select;
