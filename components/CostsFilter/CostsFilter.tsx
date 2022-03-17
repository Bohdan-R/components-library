import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Slider } from '@mui/material';
import InputField from '../InputField';
import costsSelectors from '../../store/costs/CostsSelectors';
import styles from './CostsFilter.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeFilter, changeCategory, changeRange } from '../../store/costs/CostsSlice';
import classNames from 'classnames/bind';
import Select from '../Select';
import Button from '../Button';
import { IoCloseSharp } from 'react-icons/io5';

const cx = classNames.bind(styles);
const minDistance = 100;

function CostsFilter() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categoryReducer);
  const { filter, range, category } = useSelector(costsSelectors.getFilter);
  /* const range = useSelector(costsSelectors.getRange);
  const category = useSelector(costsSelectors.getCategory); */
  const costsAll = useSelector(costsSelectors.getAllCosts);
  const maxValue = useSelector(costsSelectors.getMaxSumOfCosts);

  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const rangeMarks = [
    {
      value: 0,
      label: 0,
    },
    /* {
      value: maxValue * 0.25,
      label: maxValue * 0.25,
    },
    {
      value: maxValue * 0.5,
      label: maxValue * 0.5,
    },
    {
      value: maxValue * 0.75,
      label: maxValue * 0.75,
    }, */
    {
      value: maxValue,
      label: maxValue,
    },
  ];

  /* console.log('Range', range);
  console.log('Filter', filter);
  console.log('rangeValue', rangeValue[1]);
  console.log('maxValue', maxValue);
  console.log('category', category); */

  /* console.log('Range', range);
  console.log('rangeValue', rangeValue);
  console.log('category', category);
  console.log('selectedCategory', selectedCategory); */


  /* const arrCategories: string[] = ['All category'];
  categories.forEach(c => arrCategories.push(c.category)); */

  const categoriesOfPayment = categories.map(({ category }) => category);

  useEffect(() => {
    setRangeValue([0, maxValue]);
  }, [maxValue]);

  const handleSearch = (value: string) => {
    dispatch(changeFilter(value));
  };

  const resetSearch = () => {
    dispatch(changeFilter(''));
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
  };

  const resetFilters = () => {
    setSelectedCategory('')
    setRangeValue([0, maxValue]);

    dispatch(changeFilter(''));
    dispatch(changeCategory(''));
    dispatch(changeRange([0, maxValue]));
  }

  return (
    <div className={styles.container}>

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
        <span
          className={cx('searchBtn', {
            hidden: !filter,
          })}
          onClick={resetSearch}
        >
          <IoCloseSharp className={styles.searchIcon} />
        </span>
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
          step={100}
          min={0}
          max={maxValue ? maxValue : 100}
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

      <div className={styles.buttonBox}>
        <Button
          as="button"
          color="blue"
          size="mediumLong"
          variant="contained"
          type="button"
          label="Apply"
          disabled={false}
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
          disabled={false}
          onClick={resetFilters}
        />
      </div>
    </div>
  );
}

export default CostsFilter;
