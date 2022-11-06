import classNames from 'classnames/bind';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from './Accordion.module.scss';

const cx = classNames.bind(styles);

interface IAccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: IAccordionItem[];
    active: string;
    setActive(value: string): void;
}

function Accordion({ items, active, setActive }: AccordionProps) {
    return (
      <div className={styles.container}>
        {items &&
          items.map(({ title, content }) => (
            <div
              key={title}
              className={cx('accordion', {
                open: active === title,
              })}
            >
              <div className={styles.accordionHead} onClick={() => setActive(title)}>
                <p className={styles.title}>{title}</p>
                <MdOutlineKeyboardArrowDown
                  className={cx('toggleIcon', {
                    open: active === title,
                  })}
                />
              </div>
              <div
                className={cx('contentBox', {
                  open: active === title,
                })}
              >
                <p
                  className={cx('content', {
                    open: active === title,
                  })}
                >
                  {content}
                </p>
              </div>
            </div>
          ))}
      </div>
    );
}

export default Accordion;
