import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import classNames from 'classnames/bind';

import Chart from '../Chart';
import ChartFilter from '../ChartFilter';

import accountingFilterSelectors from '../../../../../store/accountingFilter/AccountingFilterSelectors';
import costsSelectors from '../../../../../store/costs/CostsSelectors';
import incomeSelectors from '../../../../../store/income/IncomeSelectors';

import { ICategory } from '../../../../../interfaces/interfaces';
import { months } from '../../../../../utils/constants';

import styles from './ChartContainer.module.scss';

interface IChartContainer {
  className: string;
}
const cx = classNames.bind(styles);

function ChartContainer({ className }: IChartContainer) {
  const combineClasses = cx(styles.container, className);

  const { switcher: mainSwitcher } = useAppSelector(state => state.accountingFilterReducer.switcher);
  const { categories: costCategories } = useAppSelector(state => state.costCategoryReducer);
  const { categories: incomeCategories } = useAppSelector(state => state.incomeCategoryReducer);
  const yearsOfPayments = useSelector(costsSelectors.getAllYearsOfPayments);
  const yearsOfIncomes = useSelector(incomeSelectors.getAllYearsOfIncomes);
  const incomes = useSelector(accountingFilterSelectors.getAllIncomes);
  const payments = useSelector(accountingFilterSelectors.getAllSpending);
  const chartSwitcher = useSelector(accountingFilterSelectors.getChartSwitcher);
  const filter = useSelector(accountingFilterSelectors.getFilter);

  const handleCategories = (costCategories: ICategory[], incomeCategories: ICategory[]) => {
    if (mainSwitcher === 'Spending') {
      return ['All categories', ...costCategories.map(({ category }) => category)];
    }

    if (mainSwitcher === 'Incomes') {
      return ['All categories', ...incomeCategories.map(({ category }) => category)];
    }
  };

  const handleYears = (yearsOfPayments: string[], yearsOfIncomes: string[]) => {
    if (mainSwitcher === 'Spending') {
      return ['All years', ...yearsOfPayments];
    }

    if (mainSwitcher === 'Incomes') {
      return ['All years', ...yearsOfIncomes];
    }
  };

  const handleMonths = (months: string[]) => {
    return ['All months', ...months];
  };

  return (
    <div className={combineClasses}>
      <div className={styles.filter}>
        <ChartFilter
          categories={handleCategories(costCategories, incomeCategories)}
          years={handleYears(yearsOfPayments, yearsOfIncomes)}
          months={handleMonths(Object.values(months))}
        />
      </div>
      <div className={styles.chart}>
        <Chart />
      </div>
    </div>
  );
}

export default ChartContainer;
