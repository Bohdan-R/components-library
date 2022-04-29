import React, { useState } from 'react';
import Head from 'next/head';
import styles from './Header.module.scss';
import BurgerMenu from '../BurgerMenu';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <header className={styles.header}>
        <BurgerMenu isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
      </header>
    </>
  );
}

export default Header;
