import React from 'react';
import classNames from 'classnames/bind';
import styles from './BurgerMenu.module.scss';

const cx = classNames.bind(styles);

interface BurgerMenuProps {
  className?: string;
  isOpen: Boolean;
  setIsOpen(): void;
}

function BurgerMenu({ className, isOpen, setIsOpen }: BurgerMenuProps) {
  const combineBurgerClasses = cx(className, 'burger', {
    open: isOpen,
  });
  return (
    <div className={combineBurgerClasses} onClick={setIsOpen}>
      <span className={styles.burgerLine}></span>
    </div>
  );
}

export default BurgerMenu;
