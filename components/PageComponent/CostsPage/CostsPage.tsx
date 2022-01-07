import React, { useState } from 'react';
import shortid from 'shortid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ICategory, ICost } from '../../../interfaces/interfaces';
import { addCategory } from '../../../store/categories/CategoriesActionCreator';
import { addNewCost } from '../../../store/costs/CostsActionCreator';
import Button from '../../Button';
import CostList from '../../CostList';
import IconButton from '../../IconButton';
import InputField from '../../InputField';
import AddCategoryModal from '../../ModalComponents/AddCategoryModal';
import DeleteCategoryModal from '../../ModalComponents/DeleteCategoryModal';
import RadioButton from '../../RadioButton/RadioButton';
import Tooltip from '../../Tooltip';
import styles from './CostsPage.module.scss';

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
        };
        dispatch(addNewCost(newCost));

        setTitle('');
        setSum('');
        setSelectedCategory('');
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

    return (
        <>
            <div className={styles.addFormContainer}>
                <p className={styles.addFormTitle}>Add cost</p>
                <form
                    noValidate
                    autoComplete="off"
                    className={styles.addForm}
                    onSubmit={handleSubmitNewCost}
                >
                    <div className={styles.inputWrap}>
                        <InputField
                            color="blue"
                            size="medium"
                            label="title"
                            type="text"
                            value={title}
                            as="input"
                            onChange={handleTitle}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <InputField
                            color="blue"
                            size="medium"
                            label="sum"
                            type="number"
                            value={sum}
                            as="input"
                            onChange={handleSum}
                        />
                    </div>
                    <div className={styles.radioContainer}>
                        <div className={styles.radioTitleBox}>
                            <p className={styles.radioTitle}>Choose category</p>
                            <div className={styles.btnBox}>
                                <Tooltip label="Add category" size="medium" position="top">
                                    <IconButton
                                        type="button"
                                        variant="add"
                                        size="small"
                                        onClick={handleIsOpenAddModal}
                                    />
                                </Tooltip>

                                <Tooltip label="Delete category" size="medium" position="top">
                                    <IconButton
                                        type="button"
                                        variant="delete"
                                        size="small"
                                        onClick={handleIsOpenDeleteModal}
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        <ul className={styles.radioGroup}>
                            {categories &&
                                categories.map(category => (
                                    <li key={category.id} className={styles.radioItem}>
                                        <RadioButton
                                            label={category.category}
                                            name="costs"
                                            color="blue"
                                            selectedRadio={selectedCategory}
                                            onChange={setSelectedCategory}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <Button
                        color="blue"
                        size="large"
                        variant="contained"
                        type="submit"
                        label="Submit"
                        as="button"
                        disabled={(title === '' || sum === '' || selectedCategory === '') && true}
                    />
                </form>
            </div>
            <CostList />

            <AddCategoryModal
                isOpen={isOpenAddModal}
                setIsOpen={handleIsOpenAddModal}
                submitFunc={handleSubmitNewCategory}
                inputValue={addNewCategory}
                onChangeFunc={handleAddNewCategory}
            />
            <DeleteCategoryModal
                isOpen={isOpenDeleteModal}
                setIsOpen={handleIsOpenDeleteModal}
                categories={categories}
            />
        </>
    );
}

export default CostsPage;
