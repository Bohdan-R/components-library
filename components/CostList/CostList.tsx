import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { ICost } from '../../interfaces/interfaces';
import CostItem from '../CostItem';
import costsSelectors from '../../store/costs/CostsSelectors';
import styles from './CostList.module.scss';

function CostList() {
    const costs = useSelector(costsSelectors.getFilteredCosts);
    /* const { costs } = useAppSelector(state => state.costReducer.costs); */
    const { categories } = useAppSelector(state => state.categoryReducer);

    return (
        <>
            {/* <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.title}></p>
                </div>
                <ul>
                    {costs.map(cost => (
                        <CostItem key={cost.id} cost={cost} selectItems={categories} />
                    ))}
                </ul>
            </div> */}
            <table className={styles.table}>
                <thead>
                    <tr className={styles.header}>
                        <th className={styles.headerItem}>
                            Title
                            <span className={styles.decoration}></span>
                        </th>
                        <th className={styles.headerItem}>
                            Sum
                            <span className={styles.decoration}></span>
                        </th>
                        <th className={styles.headerItem}>
                            Category
                            <span className={styles.decoration}></span>
                        </th>
                        <th className={styles.headerItem}></th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {costs.map(cost => (
                        <CostItem key={cost.id} cost={cost} selectItems={categories} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default CostList;
