import React, { useState } from 'react';
import shortid from 'shortid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ICategory, ICost } from '../../../interfaces/interfaces';
import { addCategory, deleteCategory } from '../../../store/categories/CategoriesActionCreator';
import { addNewCost } from '../../../store/costs/CostsActionCreator';
import Button from '../../Button';
import CostList from '../../CostList';
import IconButton from '../../IconButton';
import InputField from '../../InputField';
import Modal from '../../Modal';
import RadioButton from '../../RadioButton/RadioButton';
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

    const handleOpenModalAddModal = () => {
        setIsOpenAddModal(true);
    };
    const handleCloseModalAddModal = () => {
        setIsOpenAddModal(false);
    };
    const handleOpenModalDeleteModal = () => {
        setIsOpenDeleteModal(true);
    };
    const handleCloseModalDeleteModal = () => {
        setIsOpenDeleteModal(false);
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
        handleCloseModalAddModal();
    };

    return (
        <>
            <div className={styles.formContainer}>
                <p className={styles.title}>Add cost</p>
                <form
                    noValidate
                    autoComplete="off"
                    className={styles.form}
                    onSubmit={handleSubmitNewCost}
                >
                    <div className={styles.inputWrap}>
                        <InputField
                            color="pink"
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
                            color="pink"
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
                                <IconButton
                                    type="button"
                                    variant="add"
                                    size="small"
                                    onClick={handleOpenModalAddModal}
                                />
                                <IconButton
                                    type="button"
                                    variant="delete"
                                    size="small"
                                    onClick={handleOpenModalDeleteModal}
                                />
                            </div>
                        </div>

                        <ul className={styles.radioGroup}>
                            {categories &&
                                categories.map(category => (
                                    <li key={category.id} className={styles.radioItem}>
                                        <RadioButton
                                            label={category.category}
                                            name="costs"
                                            color="pink"
                                            selectedRadio={selectedCategory}
                                            onChange={setSelectedCategory}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <Button
                        color="pink"
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
            <Modal active={isOpenAddModal} setActive={setIsOpenAddModal}>
                <div className={styles.addFormContainer}>
                    <p className={styles.titleForm}>Add category for payment</p>
                    <form
                        className={styles.addForm}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmitNewCategory}
                    >
                        <InputField
                            color="pink"
                            size="medium"
                            label="New category"
                            type="text"
                            value={addNewCategory}
                            as="input"
                            onChange={handleAddNewCategory}
                        />
                        <Button
                            color="pink"
                            size="medium"
                            variant="contained"
                            type="submit"
                            label="Submit"
                            as="button"
                            disabled={addNewCategory === '' && true}
                            className={styles.btn}
                        />
                        <IconButton
                            type="button"
                            variant="close"
                            size="medium"
                            onClick={handleCloseModalAddModal}
                            className={styles.closeBtn}
                        />
                    </form>
                </div>
            </Modal>
            <Modal active={isOpenDeleteModal} setActive={setIsOpenDeleteModal}>
                <div className={styles.deleteFormContainer}>
                    <p className={styles.titleForm}>Delete category</p>
                    <ul className={styles.list}>
                        {categories &&
                            categories.map(category => (
                                <li key={category.id}>
                                    <p>{category.category}</p>
                                    <IconButton
                                        type="button"
                                        variant="delete"
                                        size="medium"
                                        onClick={() => dispatch(deleteCategory(category.id))}
                                        className={styles.deleteBtn}
                                    />
                                </li>
                            ))}
                    </ul>

                    <IconButton
                        type="button"
                        variant="close"
                        size="medium"
                        onClick={handleCloseModalDeleteModal}
                        className={styles.closeBtn}
                    />
                </div>
            </Modal>
        </>
    );
}

export default CostsPage;
