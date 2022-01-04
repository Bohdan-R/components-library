import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { ICost } from '../../interfaces/interfaces';
import CostItem from '../CostItem';
import styles from './CostList.module.scss';

function CostList() {
    const { costs } = useAppSelector(state => state.costReducer);
    const { categories } = useAppSelector(state => state.categoryReducer);
    const selectItems: string[] = [];
    categories.map(({ category }) => selectItems.push(category));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}></p>
            </div>
            <ul>
                {costs.map(cost => (
                    <CostItem key={cost.id} cost={cost} selectItems={selectItems} />
                ))}
            </ul>
        </div>
    );
}

export default CostList;
