import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../../hooks/redux';

import classNames from 'classnames/bind';

import { ICategory } from '../../../../../interfaces/interfaces';

import Button from '../../../../Button';
import IconButton from '../../../../IconButton';
import InputField from '../../../../InputField';
import Select from '../../../../Select';
import Tooltip from '../../../../Tooltip';

import styles from './AddCostFrom.module.scss';

interface AddCostFromProps {
  title: string;
  sum: number | string;
  selectedCategory: string;
  categories: ICategory[];
  className: string;
  handleTitle(value: string): void;
  handleSum(value: string | number): void;
  setSelectedCategory(value: string): void;
  handleSubmitNewCost(e: React.FormEvent<HTMLFormElement>): void;
  handleIsOpenAddModal(): void;
  handleIsOpenDeleteModal(): void;
  resetForm(): void;
}

const cx = classNames.bind(styles);

function From({
  title,
  sum,
  selectedCategory,
  categories,
  className,
  handleTitle,
  handleSum,
  setSelectedCategory,
  handleSubmitNewCost,
  handleIsOpenAddModal,
  handleIsOpenDeleteModal,
  resetForm,
}: AddCostFromProps) {
  const combineClasses = cx(styles.formContainer, className);
  const categoriesOptions = categories.map(({ category }) => category);

  const { switcher } = useAppSelector(state => state.accountingFilterReducer.switcher);

  const [formTitle, setFormTitle] = useState('');

  useEffect(() => {
    setFormTitle(`Add ${switcher}`);
  }, [switcher]);

  return (
    <div className={combineClasses}>
      <p className={styles.formTitle}>{formTitle}</p>
      <form noValidate autoComplete="off" className={styles.form} onSubmit={handleSubmitNewCost}>
        <div className={styles.inputWrap}>
          <InputField
            color="blue"
            size="small"
            label="title"
            type="text"
            value={title}
            as="input"
            onChange={handleTitle}
          />
        </div>
        <div className={styles.inputWrap}>
          <InputField color="blue" size="small" label="sum" type="number" value={sum} as="input" onChange={handleSum} />
        </div>
        <div className={styles.radioContainer}>
          <div className={styles.radioTitleBox}>
            <p className={styles.radioTitle}>Choose category</p>
            <div className={styles.btnBox}>
              <Tooltip label="Add category" size="medium" position="top">
                <IconButton type="button" variant="add" size="small" onClick={handleIsOpenAddModal} />
              </Tooltip>

              <Tooltip label="Delete category" size="medium" position="top">
                <IconButton type="button" variant="delete" size="small" onClick={handleIsOpenDeleteModal} />
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={styles.selectContainer}>
          <Select
            label="Category"
            items={categoriesOptions}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            color="blue"
            size="mediumLong"
            variant="contained"
            type="submit"
            label="Submit"
            as="button"
            disabled={title === '' || sum === '' || selectedCategory === ''}
          />
          <Button
            color="blue"
            size="mediumLong"
            variant="contained"
            type="button"
            label="Cancel"
            as="button"
            disabled={title === '' && sum === '' && selectedCategory === ''}
            onClick={resetForm}
          />
        </div>
      </form>
    </div>
  );
}

export default From;
