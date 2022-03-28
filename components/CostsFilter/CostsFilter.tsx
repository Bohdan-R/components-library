import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Slider } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';
import InputField from '../InputField';
import costsSelectors from '../../store/costs/CostsSelectors';
import styles from './CostsFilter.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  changeFilter,
  changeCategory,
  changeRange,
  changeDateRange,
  changeSorting,
} from '../../store/costs/CostsSlice';
import classNames from 'classnames/bind';
import Select from '../Select';
import Button from '../Button';
import { IoCloseSharp } from 'react-icons/io5';
import { sorting } from '../../utils/sorting';

const cx = classNames.bind(styles);
const minDistance = 50;

function CostsFilter() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categoryReducer);
  const payments = useSelector(costsSelectors.getAllCosts);
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

  console.log('dateRange', dateRange);

  useEffect(() => {
    if (maxValue === 0) {
      return;
    }
    setRangeValue([0, maxValue]);
  }, [maxValue]);

  useEffect(() => {
    resetFilters();
  }, []);

  /* console.log('payments', Boolean(payments.length === 0));
  console.log('filter', filter);
  console.log('filter', Boolean(filter !== ''));
  console.log('rangeValue-1', Boolean(rangeValue[0] !== 0));
  console.log('rangeValue-2', Boolean(rangeValue[1] !== maxValue));
  console.log('selectedCategory', Boolean(selectedCategory !== ''));
  console.log('selectedSorting', Boolean(selectedSorting !== ''));
  console.log(
    'TTTTTTT',
    payments.length === 0 ||
      filter ||
      rangeValue[0] !== 0 ||
      rangeValue[1] !== maxValue ||
      selectedCategory ||
      selectedSorting,
  ); */
  const handleSearch = (value: string) => {
    dispatch(changeFilter(value));
  };

  /* const handleDate = (value: Date) => {
    const dateToString = moment(value).format('MM/DD/YYYY');

    setStartDate(dateToString);
  }; */

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

  /* const isDisabled = () => {
    if (payments.length === 0) {
      return true;
    }

    if (
      filter !== '' ||
      rangeValue[0] !== 0 ||
      rangeValue[1] !== maxValue ||
      selectedCategory !== '' ||
      selectedSorting !== ''
    ) {
      return false;
    }

    return true;
  }; */

  const Input = ({ onClick, value }) => {
    return <InputField value={value} label="date" color="blue" size="small" type="text" onClick={onClick} as="input" />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <div className={styles.searchBox}>
          <div className={styles.titleBox}>Search title</div>
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
          {/* <span
          className={cx('searchBtn', {
            hidden: !filter,
          })}
          onClick={resetSearch}
        >
          <IoCloseSharp className={styles.searchIcon} />
        </span> */}
        </div>

        <div className={styles.rangeSliderBox}>
          {rangeValue && (
            <>
              <div className={styles.titleBox}>Sum of payment</div>
              <span>
                {rangeValue[0]} - {rangeValue[1]}
              </span>
            </>
          )}
          <Slider
            step={50}
            min={0}
            max={maxValue === 0 ? 100 : maxValue}
            value={rangeValue}
            onChange={handleRangeValue}
            marks={rangeMarks}
            disableSwap
          />
        </div>

        <div className={styles.selectBox}>
          <div className={styles.titleBox}>Choose category</div>
          <Select
            label="All category"
            items={categoriesOfPayment}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </div>

        <div className={styles.sortingBox}>
          <div className={styles.titleBox}>Choose sorting</div>
          <Select label="Sorting by" items={sorting} selected={selectedSorting} setSelected={setSelectedSorting} />
        </div>

        <div className={styles.dateRangeBox}>
          <div className={styles.titleBox}>Choose date</div>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={update => {
              setDateRange(update);
            }}
            customInput={<Input />}
            /* isClearable={true} */
          />
        </div>
      </div>

      <div className={styles.buttonBox}>
        <Button
          as="button"
          color="blue"
          size="mediumLong"
          variant="contained"
          type="button"
          label="Apply"
          /* disabled={isDisabled()} */
          onClick={handleApplyFilters}
          className={styles.buttonApply}
        />
        <Button
          as="button"
          color="blue"
          size="mediumLong"
          variant="contained"
          type="button"
          label="Reset"
          /* disabled={isDisabled()} */
          onClick={resetFilters}
        />
      </div>
    </div>
  );
}

export default CostsFilter;
