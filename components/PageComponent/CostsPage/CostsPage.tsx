import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import shortid from 'shortid';
import classNames from 'classnames/bind';

import TableList from '../../CostList';
import Filter from '../../CostsFilter';
import CostsStats from './CostsPageComponents/CostsStats';
import AddCostFrom from './CostsPageComponents/AddCostFrom';
import AddCategoryModal from './CostsPageComponents/AddCategoryModal';
import DeleteCategoryModal from './CostsPageComponents/DeleteCategoryModal';

import { addNewCost } from '../../../store/costs/CostsActionCreator';
import { addNewIncome } from '../../../store/income/IncomeActionCreator';
import { addCostCategory, deleteCostCategory } from '../../../store/cost-categories/CostCategoriesActionCreator';
import {
  addIncomeCategory,
  deleteIncomeCategory,
} from '../../../store/income-categories/IncomeCategoriesActionCreator';

import { dateOptions } from '../../../utils/constants';
import { ICategory, ICostIncome } from '../../../interfaces/interfaces';

import styles from './CostsPage.module.scss';

const cx = classNames.bind(styles);

function CostsPage() {
  const dispatch = useAppDispatch();
  const { categories: costCategories } = useAppSelector(state => state.costCategoryReducer);
  const { categories: incomeCategories } = useAppSelector(state => state.incomeCategoryReducer);

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [sum, setSum] = useState<number | string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [addNewCategory, setAddNewCategory] = useState<string>('');
  const [switcher, setSwitcher] = useState<string>('Spending');

  const switcherClassName = (name: string): string => {
    return cx('switcher', {
      active: switcher === name,
    });
  };

  const handleIsOpenAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
    setAddNewCategory('');
  };
  const handleIsOpenDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const handleTitle = (value: string) => {
    setTitle(value);
  };
  const handleSum = (value: number) => {
    setSum(value);
  };
  const handleAddNewCategory = (value: string) => {
    setAddNewCategory(value);
  };

  const handleSubmitNewCost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();

    const newCost: ICostIncome = {
      id: shortid.generate(),
      title,
      sum,
      category: selectedCategory,
      date: date.toLocaleString('en-US', dateOptions),
    };

    dispatch(addNewCost(newCost));
    resetForm();
  };
  const handleSubmitNewCostCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category: ICategory = {
      id: shortid.generate(),
      category: addNewCategory,
    };

    dispatch(addCostCategory(category));
    setAddNewCategory('');
    handleIsOpenAddModal();
  };
  const handleDeleteCostCategory = (id: string) => {
    dispatch(deleteCostCategory(id));
  };

  const handleSubmitNewIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();

    const newIncome: ICostIncome = {
      id: shortid.generate(),
      title,
      sum,
      category: selectedCategory,
      date: date.toLocaleString('en-US', dateOptions),
    };

    dispatch(addNewIncome(newIncome));
    resetForm();
  };
  const handleSubmitNewIncomeCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category: ICategory = {
      id: shortid.generate(),
      category: addNewCategory,
    };

    dispatch(addIncomeCategory(category));
    setAddNewCategory('');
    handleIsOpenAddModal();
  };
  const handleDeleteIncomeCategory = (id: string) => {
    dispatch(deleteIncomeCategory(id));
  };

  const resetForm = () => {
    setTitle('');
    setSum('');
    setSelectedCategory('');
  };

  return (
    <>
      <div className={styles.switcherContainer}>
        <div
          className={switcherClassName('Spending')}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setSwitcher(e.currentTarget.textContent)}
        >
          Spending
        </div>
        <div
          className={switcherClassName('Incomes')}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setSwitcher(e.currentTarget.textContent)}
        >
          Incomes
        </div>
      </div>
      <div className={styles.headSection}>
        <AddCostFrom
          formTitle={switcher === 'Spending' ? 'Add spending' : 'Add income'}
          title={title}
          sum={sum}
          selectedCategory={selectedCategory}
          categories={switcher === 'Spending' ? costCategories : incomeCategories}
          handleTitle={handleTitle}
          handleSum={handleSum}
          setSelectedCategory={setSelectedCategory}
          handleSubmitNewCost={switcher === 'Spending' ? handleSubmitNewCost : handleSubmitNewIncome}
          handleIsOpenAddModal={handleIsOpenAddModal}
          handleIsOpenDeleteModal={handleIsOpenDeleteModal}
          resetForm={resetForm}
        />
        <CostsStats />
      </div>

      <div className={styles.tableSection}>
        <Filter switcher={switcher} />
        <TableList switcher={switcher} />
      </div>

      <AddCategoryModal
        modalTitle={switcher === 'Spending' ? 'Add category for spending' : 'Add category for income'}
        isOpen={isOpenAddModal}
        setIsOpen={handleIsOpenAddModal}
        submitFunc={switcher === 'Spending' ? handleSubmitNewCostCategory : handleSubmitNewIncomeCategory}
        inputValue={addNewCategory}
        onChangeFunc={handleAddNewCategory}
      />
      <DeleteCategoryModal
        isOpen={isOpenDeleteModal}
        setIsOpen={handleIsOpenDeleteModal}
        categories={switcher === 'Spending' ? costCategories : incomeCategories}
        deleteCategory={switcher === 'Spending' ? handleDeleteCostCategory : handleDeleteIncomeCategory}
      />
    </>
  );
}

export default CostsPage;
