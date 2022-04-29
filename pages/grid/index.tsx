import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function Grid() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <a href="#" className={styles.headerLogo}></a>
        <nav className={styles.headerMenu}>
          <ul className={styles.headerList}>
            <li className={styles.headerItem}>
              <a href="#" className={styles.headerLink}>
                Menu Link
              </a>
            </li>
            <li className={styles.headerItem}>
              <a href="#" className={styles.headerLink}>
                Menu Link
              </a>
            </li>
            <li className={styles.headerItem}>
              <a href="#" className={styles.headerLink}>
                Menu Link
              </a>
            </li>
            <li className={styles.headerItem}>
              <a href="#" className={styles.headerLink}>
                Menu Link
              </a>
            </li>
          </ul>
          <div className={styles.headerBurger}>
            <span></span>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarMenu}>
            <ul>
              <li className={styles.sidebarItem}>
                <a href="" className={styles.sidebarLink}>
                  Item
                </a>
              </li>
              <li className={styles.sidebarItem}>
                <a href="" className={styles.sidebarLink}>
                  Item
                </a>
              </li>
              <li className={styles.sidebarItem}>
                <a href="" className={styles.sidebarLink}>
                  Item
                </a>
              </li>
              <li className={styles.sidebarItem}>
                <a href="" className={styles.sidebarLink}>
                  Item
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <section className={styles.content}>
          <h1 className={styles.contentTitle}>GRID Layout</h1>
          <section className={cx('contentGallery', 'gallery')}>
            <h2 className={styles.galleryTitle}>Gallery</h2>
            <div className={styles.galleryItems}>
              <div className={cx('galleryItem', 'galleryItemBig')}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={cx('galleryItem', 'galleryItemBig')}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
              <div className={styles.galleryItem}></div>
            </div>
          </section>
          <section className={cx('contentProduct', 'product')}>
            <h2 className={styles.productTitle}>Product</h2>
            <div className={styles.productItems}>
              <div className={styles.productItem}>
                <a href="" className={styles.productImage}>
                  <div></div>
                </a>
                <a href="" className={styles.productName}>
                  Заканчиваем изучать Grid Layout и сегодня применим ранее изученные
                </a>
                <a href="" className={styles.productButton}>
                  Buy
                </a>
              </div>
              <div className={styles.productItem}>
                <a href="" className={styles.productImage}>
                  <div></div>
                </a>
                <a href="" className={styles.productName}>
                  Заканчиваем изучать Grid Layout и сегодня применим ранее изученные
                </a>
                <a href="" className={styles.productButton}>
                  Buy
                </a>
              </div>
              <div className={styles.productItem}>
                <a href="" className={styles.productImage}>
                  <div></div>
                </a>
                <a href="" className={styles.productName}>
                  Заканчиваем изучать Grid Layout и сегодня применим ранее изученные
                </a>
                <a href="" className={styles.productButton}>
                  Buy
                </a>
              </div>
              <div className={styles.productItem}>
                <a href="" className={styles.productImage}>
                  <div></div>
                </a>
                <a href="" className={styles.productName}>
                  Заканчиваем изучать Grid Layout и сегодня применим ранее изученные
                </a>
                <a href="" className={styles.productButton}>
                  Buy
                </a>
              </div>
              <div className={styles.productItem}>
                <a href="" className={styles.productImage}>
                  <div></div>
                </a>
                <a href="" className={styles.productName}>
                  Заканчиваем изучать Grid Layout и сегодня применим ранее изученные
                </a>
                <a href="" className={styles.productButton}>
                  Buy
                </a>
              </div>
              <div className={styles.productItem}>
                <a href="" className={styles.productImage}>
                  <div></div>
                </a>
                <a href="" className={styles.productName}>
                  Заканчиваем изучать Grid Layout и сегодня применим ранее изученные
                </a>
                <a href="" className={styles.productButton}>
                  Buy
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerCopy}>Copy 2022</div>
        <div className={styles.footerText}>Sdasd asdsadd dsgsdfg asasd</div>
      </footer>
    </div>
  );
}

export default Grid;
