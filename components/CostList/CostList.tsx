import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import CostItem from '../CostItem';
import costsSelectors from '../../store/costs/CostsSelectors';
import styles from './CostList.module.scss';

const headerTitle = ['#', 'Name', 'Sum', 'Category', 'Date', ''];

function CostList() {
  const costs = useSelector(costsSelectors.filteredPayments);
  const { categories } = useAppSelector(state => state.categoryReducer);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            {headerTitle.map(title => (
              <th key={title} className={styles.headerItem}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {costs.map((cost, i) => (
            <CostItem key={cost.id} cost={cost} number={i + 1} selectItems={categories.map(c => c.category)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CostList;
