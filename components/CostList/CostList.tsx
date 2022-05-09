import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';

import CostItem from '../CostItem';

import costsSelectors from '../../store/costs/CostsSelectors';
import incomesSelectors from '../../store/income/IncomeSelectors';

import { ICostIncome, ICategory } from '../../interfaces/interfaces';

import styles from './CostList.module.scss';

interface IList {
  switcher: string;
}

const headerTitle = ['#', 'Name', 'Sum', 'Category', 'Date', ''];

function TableList({ switcher }: IList) {
  const costs = useSelector(costsSelectors.filteredPayments);
  const incomes = useSelector(incomesSelectors.filteredIncomes);
  const { categories: costCategories } = useAppSelector(state => state.costCategoryReducer);
  const { categories: incomeCategories } = useAppSelector(state => state.incomeCategoryReducer);

  const [categories, setCategories] = useState<ICategory[]>(null);
  const [list, setList] = useState<ICostIncome[]>(null);

  useEffect(() => {
    if (switcher === 'Spending') {
      setList(costs);
      setCategories(costCategories);
      return;
    }

    setList(incomes);
    setCategories(incomeCategories);
  }, [switcher, costs, costCategories, incomes, incomeCategories]);

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
          {list &&
            list.map((item, i) => (
              <CostItem
                key={item.id}
                switcher={switcher}
                item={item}
                number={i + 1}
                selectItems={categories.map(c => c.category)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableList;
