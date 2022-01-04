import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { ICost } from '../../interfaces/interfaces';
import { deleteCost, updateCost } from '../../store/costs/CostsActionCreator';
import IconButton from '../IconButton';
import InputField from '../InputField';
import Select from '../Select';

import styles from './CostItem.module.scss';

interface CostItemProps {
    cost: ICost;
    selectItems: string[];
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
                <li className={styles.item}>
                    <p className={styles.content}>{cost.title}</p>
                    <p className={styles.content}>{cost.sum}</p>
                    <p className={styles.content}>{cost.category}</p>
                    <div className={styles.btnWrap}>
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
                </li>
            ) : (
                <div className={styles.item}>
                    <div>
                        <InputField
                            color="pink"
                            size="small"
                            label="title"
                            type="text"
                            value={editTitle}
                            as="input"
                            onChange={handleEditTitle}
                        />
                    </div>
                    <div>
                        <InputField
                            color="pink"
                            size="small"
                            label="sum"
                            type="text"
                            value={editSum}
                            as="input"
                            onChange={handleEditSum}
                        />
                    </div>
                    <div>
                        <Select
                            label="Category"
                            items={selectItems}
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                        />
                    </div>
                    <div className={styles.btnWrap}>
                        <IconButton
                            type="button"
                            variant="confirm"
                            size="medium"
                            onClick={handleSubmit}
                        />
                        <IconButton
                            type="button"
                            variant="close"
                            size="medium"
                            onClick={handleIsChange}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default CostItem;
