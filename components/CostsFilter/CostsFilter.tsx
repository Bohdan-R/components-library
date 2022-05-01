import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import _ from 'lodash';
import { Slider } from '@mui/material';
import DatePicker from 'react-datepicker';
import classNames from 'classnames/bind';

import InputField from '../InputField';
import costsSelectors from '../../store/costs/CostsSelectors';
import {
  changeFilter,
  changeCategory,
  changeRange,
  changeDateRange,
  changeSorting,
} from '../../store/costs/CostsSlice';

import Select from '../Select';
import Button from '../Button';

import { sorting } from '../../utils/sorting';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CostsFilter.module.scss';

const cx = classNames.bind(styles);
const minDistance = 50;

function CostsFilter() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categoryReducer);
  const { filter } = useSelector(costsSelectors.getFilter);
  const maxValue = useSelector(costsSelectors.getMaxSumOfCosts);

  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSorting, setSelectedSorting] = useState<string>('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const rangeMarks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: maxValue === 0 ? 100 : maxValue,
      label: maxValue === 0 ? 100 : maxValue,
    },
  ];

  const categoriesOfPayment = categories.map(({ category }) => category);

  useEffect(() => {
    if (maxValue === 0) {
      return;
    }
    setRangeValue([0, maxValue]);
  }, [maxValue]);

  useEffect(() => {
    resetFilters();
  }, []);

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

  const handleApplyFilters = () => {
    dispatch(changeRange(rangeValue));
    dispatch(changeCategory(selectedCategory));
    dispatch(changeDateRange([startDate, endDate]));
    dispatch(changeSorting(selectedSorting));
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setRangeValue([0, maxValue]);
    setSelectedSorting('');
    setDateRange([null, null]);

    dispatch(changeFilter(''));
    dispatch(changeCategory(''));
    dispatch(changeRange([0, maxValue]));
    dispatch(changeDateRange([null, null]));
    dispatch(changeSorting(''));
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
                items={categoriesOfPayment}
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
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={update => {
                  setDateRange(update);
                }}
                customInput={<Input />}
                isClearable={true}
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
      </div>
    </div>
  );
}

export default CostsFilter;
