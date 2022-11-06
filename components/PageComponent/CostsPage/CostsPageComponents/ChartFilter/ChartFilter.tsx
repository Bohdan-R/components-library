import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import classNames from 'classnames/bind';

import Select from '../../../../Select';

import {
  changeChartSwitcher,
  changeChartType,
  changeChartCategory,
  changeChartYear,
  changeChartMonth,
  resetChartFilter,
} from '../../../../../store/accountingFilter/AccountingFilterSlice';

import styles from './ChartFilter.module.scss';
import Button from '../../../../Button';

interface IChartFilter {
  categories: string[];
  years: string[];
  months: string[];
}

const cx = classNames.bind(styles);
const accountingType = ['Spending', 'Incomes'];
const charts = ['Bar', 'Line', 'Circle'];

function ChartFilter({ categories, years, months }: IChartFilter) {
  const dispatch = useAppDispatch();
  const chartFilters = useAppSelector(state => state.accountingFilterReducer.chartFilters);
  const { switcher: chartSwitcher } = useAppSelector(state => state.accountingFilterReducer.chartSwitcher);
  const { switcher: mainSwitcher } = useAppSelector(state => state.accountingFilterReducer.switcher);

  const [selectedAccountingType, setSelectedAccountingType] = useState<string[]>([]);
  const [selectedChartType, setSelectedChartType] = useState<string>('Bar');
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [selectedYear, setSelectedYear] = useState<string>('All years');
  const [selectedMonth, setSelectedMonth] = useState<string>('All months');

  /* console.log('AAAAA: ', { selectedChartType, selectedCategory, selectedYear, selectedMonth });
  console.log('selectedAccountingType: ', selectedAccountingType);
  console.log('chartFilters: ', chartFilters); */
  /* console.log('chartFilters: ', chartFilters); */
  useEffect(() => {
    setSelectedAccountingType([mainSwitcher]);
  }, [mainSwitcher]);

  useEffect(() => {
    setSelectedChartType(chartFilters.chartType);
    setSelectedCategory(chartFilters.category);
    setSelectedYear(chartFilters.year);
  }, [chartFilters]);

  useEffect(() => {
    dispatch(changeChartSwitcher(selectedAccountingType));
  }, [selectedAccountingType, dispatch]);

  useEffect(() => {
    if (chartFilters.chartType === 'Pie' || selectedAccountingType.length > 1) {
      dispatch(changeChartCategory('All categories'));
    }
  }, [selectedAccountingType.length, chartFilters.chartType, dispatch]);

  const chartSwitcherClassName = (value: string): string => {
    return cx('item', {
      active: selectedAccountingType.includes(value),
    });
  };

  const chartClassName = (name: string): string => {
    return cx('item', {
      active: selectedChartType === name,
    });
  };

  const handleNumberOfMonth = (month: string) => {
    if (month === 'All months') {
      return null;
    }
    const selectedMonth = month && Object.entries(months).find(m => m[1] === month);
    const numberOfMonth = Number(selectedMonth[0]);
    return numberOfMonth;
  };

  const handleSelectedAccountingType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.textContent;

    if (selectedAccountingType.includes(value)) {
      const newFilter = selectedAccountingType.filter(f => f !== value);
      return setSelectedAccountingType(newFilter);
    }

    setSelectedAccountingType([...selectedAccountingType, ...[value]]);
  };

  const handleSelectedChartType = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(changeChartType(e.currentTarget.textContent));
  };

  const handleSelectedCategory = (value: string) => {
    setSelectedCategory(value);
    dispatch(changeChartCategory(value));
  };
  const handleSelectedYear = (value: string) => {
    setSelectedYear(value);
    dispatch(changeChartYear(value));
  };
  const handleSelectedMonth = (value: string) => {
    setSelectedMonth(value);
    dispatch(changeChartMonth(handleNumberOfMonth(value)));
  };

  const resetFilter = () => {
    const resetedAccountingType = selectedAccountingType.filter(type => type === mainSwitcher);
    setSelectedAccountingType(resetedAccountingType);

    setSelectedCategory('All categories');
    setSelectedYear('All years');
    setSelectedMonth('All months');
    setSelectedChartType('Bar');

    dispatch(changeChartCategory('All categories'));
    dispatch(changeChartYear('All years'));
    dispatch(changeChartMonth(handleNumberOfMonth('All months')));
    dispatch(changeChartType('Bar'));
  };

  return (
    <div className={styles.container}>
      {/* <span className={styles.border}></span> */}
      <div className={styles.switcherContainer}>
        {/* <div className={styles.filterBox}> */}
        <div className={styles.list}>
          {accountingType.map(i => (
            <button
              key={i}
              className={chartSwitcherClassName(i)}
              onClick={handleSelectedAccountingType}
              disabled={mainSwitcher === i}
            >
              {i}
            </button>
          ))}
        </div>
        {/* </div> */}
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.filterBox}>
          <div className={styles.title}>Choose chart type</div>
          <div className={styles.list}>
            {charts.map(i => (
              <div key={i} className={chartClassName(i)} onClick={handleSelectedChartType}>
                {i}
              </div>
            ))}
          </div>
        </div>
        {!(chartSwitcher.includes('Spending') && chartSwitcher.includes('Incomes')) && selectedChartType !== 'Pie' && (
          <div className={styles.filterBox}>
            <div className={styles.title}>Choose category</div>
            <Select items={categories} selected={selectedCategory} setSelected={handleSelectedCategory} />
          </div>
        )}
        <div className={styles.filterBox}>
          <div className={styles.title}>Choose year</div>
          <Select items={years} selected={selectedYear} setSelected={handleSelectedYear} />
        </div>
        <div className={styles.filterBox}>
          <div className={styles.title}>Choose month</div>
          <Select items={months} selected={selectedMonth} setSelected={handleSelectedMonth} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          as="button"
          color="blue"
          size="mediumLong"
          variant="contained"
          type="button"
          label="Reset"
          onClick={resetFilter}
        />
      </div>
    </div>
  );
}
export default ChartFilter;
