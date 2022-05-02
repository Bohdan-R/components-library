import React from 'react';
import { useSelector } from 'react-redux';
import costsSelectors from '../../../../../store/costs/CostsSelectors';

import styles from './CostsStats.module.scss';

function CostsStats() {
  const amount = useSelector(costsSelectors.getAllPayments);
  const minValue = useSelector(costsSelectors.getMinSumOfCosts);
  const maxValue = useSelector(costsSelectors.getMaxSumOfCosts);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Costs statistic</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.itemTitle}>Total amount:</p>
          <p className={styles.itemValue}>{amount.length}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.itemTitle}>min sum:</p>
          <p className={styles.itemValue}>{minValue}</p>
        </li>
        <li className={styles.item}>
          <p className={styles.itemTitle}>max sum:</p>
          <p className={styles.itemValue}>{maxValue}</p>
        </li>
      </ul>
    </div>
  );
}

export default CostsStats;
