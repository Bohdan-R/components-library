import React from 'react';
import { ICategory } from '../../../../../interfaces/interfaces';
import Button from '../../../../Button';
import IconButton from '../../../../IconButton';
import InputField from '../../../../InputField';
import RadioButton from '../../../../RadioButton/RadioButton';
import Tooltip from '../../../../Tooltip';

import styles from './AddCostFrom.module.scss';

interface AddCostFromProps {
    title: string;
    sum: number | string;
    selectedCategory: string;
    categories: ICategory[];
    handleTitle(value: string): void;
    handleSum(value: string | number): void;
    setSelectedCategory(value: string): void;
    handleSubmitNewCost(e: React.FormEvent<HTMLFormElement>): void;
    handleIsOpenAddModal(): void;
    handleIsOpenDeleteModal(): void;
}

function AddCostFrom({
    title,
    sum,
    selectedCategory,
    categories,
    handleTitle,
    handleSum,
    setSelectedCategory,
    handleSubmitNewCost,
    handleIsOpenAddModal,
    handleIsOpenDeleteModal,
}: AddCostFromProps) {
    return (
        <div className={styles.formContainer}>
            <p className={styles.formTitle}>Add cost</p>
            <form
                noValidate
                autoComplete="off"
                className={styles.form}
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
    );
}

export default AddCostFrom;
