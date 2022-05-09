import React, { useEffect } from 'react';
import CostsPage from '../../components/PageComponent/CostsPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCostCategories } from '../../store/cost-categories/CostCategoriesActionCreator';
import { fetchIncomeCategories } from '../../store/income-categories/IncomeCategoriesActionCreator';
import { fetchCosts } from '../../store/costs/CostsActionCreator';
import { fetchIncomes } from '../../store/income/IncomeActionCreator';
import styles from './Costs.module.scss';

function Costs() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCosts());
    dispatch(fetchIncomes());
    dispatch(fetchCostCategories());
    dispatch(fetchIncomeCategories());
  }, []);
  return (
    <div className={styles.container}>
      <CostsPage />
    </div>
  );
}

export default Costs;
