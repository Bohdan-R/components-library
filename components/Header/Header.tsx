import React from 'react';
import Head from 'next/head';
import styles from './Header.module.scss';

function Header() {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <header className={styles.header}>asdasd</header>
        </>
    );
}

export default Header;
