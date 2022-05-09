import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import _ from 'lodash';
import { Slider } from '@mui/material';
import DatePicker from 'react-datepicker';
import classNames from 'classnames/bind';

import costsSelectors from '../../store/costs/CostsSelectors';
import incomeSelectors from '../../store/income/IncomeSelectors';
import {
  changeFilter,
  changeCategory,
  changeRange,
  changeDate,
  changeSorting,
  changeYear,
  changeMonth,
} from '../../store/accountingFilter/AccountingFilterSlice';

import InputField from '../InputField';
import Select from '../Select';
import Button from '../Button';

import { sorting, months } from '../../utils/constants';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CostsFilter.module.scss';

interface IFilter {
  switcher: string;
}

const cx = classNames.bind(styles);
const minDistance = 50;

function Filter({ switcher }: IFilter) {
  const dispatch = useAppDispatch();
  const { categories: costCategories } = useAppSelector(state => state.costCategoryReducer);
  const { categories: incomeCategories } = useAppSelector(state => state.incomeCategoryReducer);
  const { filter } = useSelector(costsSelectors.getFilter);
  const maxValueCosts = useSelector(costsSelectors.getMaxSumOfCosts);
  const maxValueIncomes = useSelector(incomeSelectors.getMaxSumOfIncomes);
  const yearsOfPayments = useSelector(costsSelectors.getAllYearsOfPayments);
  const yearsOfIncomes = useSelector(incomeSelectors.getAllYearsOfIncomes);

  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [maxValue, setMaxValue] = useState<number>(null);
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSorting, setSelectedSorting] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(null);

  useEffect(() => {
    resetFilters();
  }, [maxValue]);

  useEffect(() => {
    if (switcher === 'Spending') {
      setYears(yearsOfPayments);
      setCategories(costCategories.map(({ category }) => category));
      setMaxValue(maxValueCosts);
      return;
    }

    setYears(yearsOfIncomes);
    setCategories(incomeCategories.map(({ category }) => category));
    setMaxValue(maxValueIncomes);
  }, [
    switcher,
    filter,
    yearsOfPayments,
    yearsOfIncomes,
    costCategories,
    incomeCategories,
    maxValueIncomes,
    maxValueCosts,
  ]);

  useEffect(() => {
    if (maxValue === 0) {
      return;
    }
    setRangeValue([0, maxValue]);
  }, [maxValue]);

  const handleSearch = (value: string) => {
    dispatch(changeFilter(value));
  };

  const handleRangeValue = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRangeValue([Math.min(newValue[0], rangeValue[1] - minDistance), rangeValue[1]]);
    } else {
      setRangeValue([rangeValue[0], Math.max(newValue[1], rangeValue[0] + minDistance)]);
    }
  };

  const handleNumberOfMonth = (month: string) => {
    const selectedMonth = month && Object.entries(months).find(m => m[1] === month);
    const numberOfMonth = Number(selectedMonth[0]);
    return numberOfMonth;
  };

  const handleApplyFilters = () => {
    dispatch(changeFilter(filter));
    dispatch(changeRange(rangeValue));
    dispatch(changeCategory(selectedCategory));
    dispatch(changeDate(selectedDate));
    dispatch(changeSorting(selectedSorting));
    dispatch(changeYear(selectedYear));
    dispatch(changeMonth(handleNumberOfMonth(selectedMonth)));
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setRangeValue([0, maxValue]);
    setSelectedSorting('');
    setSelectedDate(null);
    setSelectedYear('');
    setSelectedMonth('');

    dispatch(changeFilter(''));
    dispatch(changeCategory(''));
    dispatch(changeRange([0, maxValue]));
    dispatch(changeDate(selectedDate));
    dispatch(changeSorting(''));
    dispatch(changeYear(''));
    dispatch(changeMonth(null));
  };

  const Input = ({ onClick, value }) => {
    return <InputField value={value} label="date" color="blue" size="small" type="text" onClick={onClick} as="input" />;
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.filtersUp}>
            <div className={styles.filterBox}>
              <div className={styles.title}>Search title</div>
              <InputField
                color="blue"
                size="small"
                label="search"
                type="text"
                value={filter}
                as="input"
                autoComplete="off"
                onChange={handleSearch}
              />
            </div>

            <div className={styles.rangeSliderBox}>
              <div className={styles.title}>Sum of payment</div>
              <div className={styles.rangeWrapper}>
                <span>{rangeValue[0]}</span>
                <span>{rangeValue[1]}</span>
              </div>
              <Slider
                step={50}
                min={0}
                max={maxValue === 0 ? 100 : maxValue}
                value={rangeValue}
                onChange={handleRangeValue}
                disableSwap
              />
            </div>
          </div>
          <div className={styles.filtersDow}>
            <div className={styles.filterBox}>
              <div className={styles.title}>Choose category</div>
              <Select
                label="All category"
                items={categories}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
            </div>

            <div className={styles.filterBox}>
              <div className={styles.title}>Choose sorting</div>
              <Select label="Sorting by" items={sorting} selected={selectedSorting} setSelected={setSelectedSorting} />
            </div>

            <div className={styles.filterBox}>
              <div className={styles.title}>Choose date</div>
              <DatePicker
                selected={selectedDate}
                customInput={<Input />}
                onChange={date => setSelectedDate(date)}
                isClearable
              />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              as="button"
              color="blue"
              size="medium"
              variant="contained"
              type="button"
              label="Apply"
              onClick={handleApplyFilters}
              className={styles.buttonApply}
            />
            <Button
              as="button"
              color="blue"
              size="medium"
              variant="contained"
              type="button"
              label="Reset"
              onClick={resetFilters}
            />
          </div>
        </div>
        <div className={styles.filterBox}>
          <div className={styles.title}>Choose Year</div>
          <Select label="Year" items={years} selected={selectedYear} setSelected={setSelectedYear} />
        </div>

        <div className={styles.filterBox}>
          <div className={styles.title}>Choose Month</div>
          <Select label="Month" items={Object.values(months)} selected={selectedMonth} setSelected={setSelectedMonth} />
        </div>
      </div>
    </div>
  );
}

export default Filter;
