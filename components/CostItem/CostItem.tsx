import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { ICategory, ICost } from '../../interfaces/interfaces';
import { deleteCost, updateCost } from '../../store/costs/CostsActionCreator';
import IconButton from '../IconButton';
import InputField from '../InputField';
import Select from '../Select';

import styles from './CostItem.module.scss';

interface CostItemProps {
    cost: ICost;
    selectItems: ICategory[];
}

function CostItem({ cost, selectItems }: CostItemProps) {
    const dispatch = useAppDispatch();
    const [isChange, setIsChange] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(cost.category || '');
    const [editTitle, setEditTitle] = useState<string>(cost.title || '');
    const [editSum, setEditSum] = useState<number | string>(cost.sum || '');

    const handleEditTitle = (value: string) => {
        setEditTitle(value);
    };
    const handleEditSum = (value: number) => {
        setEditSum(value);
    };

    const handleSubmit = () => {
        const editedCost: ICost = {
            id: cost.id,
            title: editTitle,
            sum: editSum,
            category: selectedCategory,
        };

        dispatch(updateCost(editedCost));

        handleIsChange();
    };

    const handleIsChange = () => {
        setIsChange(!isChange);
    };

    return (
        <>
            {isChange === false ? (
                <tr className={styles.item}>
                    <td className={styles.itemContent}>
                        {cost.title}
                        <span className={styles.decoration}></span>
                    </td>
                    <td className={styles.itemContent}>
                        {cost.sum}
                        <span className={styles.decoration}></span>
                    </td>
                    <td className={styles.itemContent}>
                        {cost.category}
                        <span className={styles.decoration}></span>
                    </td>
                    <td className={styles.itemContent}>
                        <div className={styles.btnBox}>
                            <IconButton
                                type="button"
                                variant="edit"
                                size="medium"
                                onClick={handleIsChange}
                            />
                            <IconButton
                                type="button"
                                variant="delete"
                                size="medium"
                                onClick={() => dispatch(deleteCost(cost.id))}
                            />
                        </div>
                    </td>
                </tr>
            ) : (
                <tr className={styles.item}>
                    <td className={styles.itemContent}>
                        <InputField
                            color="blue"
                            size="small"
                            label="title"
                            type="text"
                            value={editTitle}
                            as="input"
                            onChange={handleEditTitle}
                        />
                        <span className={styles.decoration}></span>
                    </td>
                    <td className={styles.itemContent}>
                        <InputField
                            color="blue"
                            size="small"
                            label="sum"
                            type="text"
                            value={editSum}
                            as="input"
                            onChange={handleEditSum}
                        />
                        <span className={styles.decoration}></span>
                    </td>
                    <td className={styles.itemContent}>
                        <Select
                            label="Category"
                            items={selectItems}
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                        />
                        <span className={styles.decoration}></span>
                    </td>
                    <td className={styles.itemContent}>
                        <div className={styles.btnBox}>
                            <IconButton
                                type="button"
                                variant="confirm"
                                size="medium"
                                onClick={handleSubmit}
                            />
                            <IconButton
                                type="button"
                                variant="cancel"
                                size="medium"
                                onClick={handleIsChange}
                            />
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default CostItem;
