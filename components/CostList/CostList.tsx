import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import CostItem from '../CostItem';
import costsSelectors from '../../store/costs/CostsSelectors';
import styles from './CostList.module.scss';

function CostList() {
  const costs = useSelector(costsSelectors.filteredPayments);
  const { categories } = useAppSelector(state => state.categoryReducer);

  return (
    <div className={styles.container}>
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
            <th className={styles.headerItem}>
              Date
              <span className={styles.decoration}></span>
            </th>
            <th className={styles.headerItem}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {costs.map(cost => (
            <CostItem key={cost.id} cost={cost} selectItems={categories.map(c => c.category)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CostList;
