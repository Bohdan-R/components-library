import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import {
    AiOutlineHome,
    AiOutlineUnorderedList,
    AiOutlinePlusCircle,
} from 'react-icons/ai';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import styles from './Drawer.module.scss';

const cx = classNames.bind(styles);

/* interface IAccordionSub {
    subTitle: string;
    path: string;
    icon: React.ReactChild | React.ReactNode;
}

interface IAccordion {
    title: string;
    subMenu: IAccordionSub[];
} */

function Drawer() {
    const router = useRouter();
    const [active, setActive] = useState<string>('');

    /*  const makeLinks2 = [
        {
            title: 'Todos',
            subMenu: [
                {
                    subTitle: 'Todo list',
                    path: '/todos',
                    icon: AiOutlineUnorderedList,
                },
                {
                    subTitle: 'Create new todo',
                    path: '/create-todo',
                    icon: AiOutlinePlusCircle,
                },
            ],
        },
        {
            title: 'Notes',
            subMenu: [
                {
                    subTitle: 'Note list',
                    path: '/notes',
                    icon: GiNotebook,
                },
                {
                    subTitle: 'Create new note',
                    path: '/create-note',
                    icon: AiOutlinePlusCircle,
                },
            ],
        },
    ]; */

    const makeLinks = [
        {
            title: 'Todos',
            path: '/todos',
            icon: AiOutlineUnorderedList,
        },
        {
            title: 'Create new todo',
            path: '/create-todo',
            icon: AiOutlinePlusCircle,
        },
        { title: 'Note list', path: '/notes', icon: GiNotebook },
        {
            title: 'Create new note',
            path: '/create-note',
            icon: AiOutlinePlusCircle,
        },
        {
            title: 'Cost accounting',
            path: '/costs',
            icon: FaMoneyBillAlt,
        },
    ];

    return (
        <div className={styles.drawer}>
            <ul className={styles['link-list']}>
                {makeLinks.map(link => (
                    <li
                        key={link.title}
                        className={cx('link-item', {
                            active: router.pathname === link.path,
                        })}
                    >
                        <Link href={link.path}>
                            <a className={styles.link}>
                                <span className={styles['link-icon']}>
                                    {<link.icon />}
                                </span>
                                {link.title}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Drawer;

{
    /* <div className={styles.drawer}>
    <ul className={styles['link-list']}>
        {makeLinks.map(link => (
            <li
                key={link.text}
                className={cx('link-item', {
                    active: router.pathname === link.path,
                })}
            >
                <Link href={link.path}>
                    <a className={styles.link}>
                        <span className={styles['link-icon']}>
                            {<link.icon />}
                        </span>
                        {link.text}
                    </a>
                </Link>
            </li>
        ))}
    </ul>
</div>; */
}

{
    /* <div className={styles.drawer}>
            <div className={styles.linkList}>
                {makeLinks.map(({ title, subMenu }) => {
                    const combineClasses = cx('subMenuList', {
                        visible: active === title,
                    });
                    return (
                        <>
                            <div
                                key={title}
                                className={styles.menuItem}
                                active={active}
                                onClick={() => setActive(title)}
                            >
                                {title}
                            </div>
                            <ul className={combineClasses}>
                                {subMenu &&
                                    subMenu.map(subMenu => (
                                        <li
                                            key={subMenu.subTitle}
                                            className={styles.subMenuItem}
                                        >
                                            <Link href={subMenu.path}>
                                                <a
                                                    className={
                                                        styles.subMenuLink
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.linkIcon
                                                        }
                                                    >
                                                        {<subMenu.icon />}
                                                    </span>
                                                    {subMenu.subTitle}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    );
                })}
            </div>
        </div> */
}
