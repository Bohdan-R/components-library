import React from 'react';
import Header from '../Header';
import Drawer from '../Drawer';
import styles from './Layout.module.scss';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactChild | React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
        {/* <Drawer /> */}
      </div>
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
