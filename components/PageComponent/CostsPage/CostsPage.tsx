import React, { useState } from 'react';
import shortid from 'shortid';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ICategory, ICost } from '../../../interfaces/interfaces';
import { addCategory } from '../../../store/categories/CategoriesActionCreator';
import { addNewCost } from '../../../store/costs/CostsActionCreator';
import CostList from '../../CostList';
import CostsFilter from '../../CostsFilter';
import AddCostFrom from './CostsPageComponents/AddCostFrom';
import AddCategoryModal from './CostsPageComponents/AddCategoryModal';
import DeleteCategoryModal from './CostsPageComponents/DeleteCategoryModal';
import styles from './CostsPage.module.scss';
import CostsStats from './CostsPageComponents/CostsStats';

function CostsPage() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categoryReducer);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [sum, setSum] = useState<number | string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [addNewCategory, setAddNewCategory] = useState<string>('');

  const handleIsOpenAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
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

    const newCost: ICost = {
      id: shortid.generate(),
      title,
      sum,
      category: selectedCategory,
      date: moment().format('DD MMMM, YYYY'),
    };
    dispatch(addNewCost(newCost));

    resetForm();
  };
  const handleSubmitNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category: ICategory = {
      id: shortid.generate(),
      category: addNewCategory,
    };

    dispatch(addCategory(category));

    setAddNewCategory('');
    handleIsOpenAddModal();
  };

  const resetForm = () => {
    setTitle('');
    setSum('');
    setSelectedCategory('');
  };

  return (
    <>
      <div className={styles.headSection}>
        <AddCostFrom
          title={title}
          sum={sum}
          selectedCategory={selectedCategory}
          categories={categories}
          handleTitle={handleTitle}
          handleSum={handleSum}
          setSelectedCategory={setSelectedCategory}
          handleSubmitNewCost={handleSubmitNewCost}
          handleIsOpenAddModal={handleIsOpenAddModal}
          handleIsOpenDeleteModal={handleIsOpenDeleteModal}
          resetForm={resetForm}
        />
        <CostsStats />
      </div>

      <div className={styles.tableSection}>
        <CostsFilter />
        <CostList />
      </div>

      <AddCategoryModal
        isOpen={isOpenAddModal}
        setIsOpen={handleIsOpenAddModal}
        submitFunc={handleSubmitNewCategory}
        inputValue={addNewCategory}
        onChangeFunc={handleAddNewCategory}
      />
      <DeleteCategoryModal isOpen={isOpenDeleteModal} setIsOpen={handleIsOpenDeleteModal} categories={categories} />
    </>
  );
}

export default CostsPage;
