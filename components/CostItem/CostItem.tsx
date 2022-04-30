import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useAppDispatch } from '../../hooks/redux';
import { ICost } from '../../interfaces/interfaces';
import { deleteCost, updateCost } from '../../store/costs/CostsActionCreator';
import IconButton from '../IconButton';
import InputField from '../InputField';
import Select from '../Select';
import Tooltip from '../Tooltip';

import styles from './CostItem.module.scss';

interface CostItemProps {
  cost: ICost;
  selectItems: string[];
  number: number;
}

function CostItem({ cost, selectItems, number }: CostItemProps) {
  const dispatch = useAppDispatch();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<string>(cost.category || '');
  const [editTitle, setEditTitle] = useState<string>(cost.title || '');
  const [editSum, setEditSum] = useState<number | string>(cost.sum || '');
  const [editDate, setEditDate] = useState<Date>(cost.date ? new Date(cost.date) : null);

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
      category: editCategory,
      date: moment(editDate).format('DD MMMM, YYYY'),
    };

    dispatch(updateCost(editedCost));

    handleIsChange();
  };

  const handleIsChange = () => {
    setIsChange(!isChange);
  };

  const Input = ({ onClick, value }) => {
    return (
      <InputField
        classNameInput={styles.input}
        value={value}
        color="blue"
        size="small"
        type="text"
        onClick={onClick}
        as="input"
      />
    );
  };

  return (
    <>
      {isChange === false ? (
        <tr className={styles.item}>
          <td className={styles.itemContent}>{number}</td>
          {Object.values(cost)
            .slice(1)
            .map(c => (
              <td key={c} className={styles.itemContent}>
                {c}
              </td>
            ))}
          <td className={styles.itemContent}>
            <div className={styles.btnBox}>
              <Tooltip label="Edit" size="medium" position="top">
                <IconButton type="button" variant="edit" size="medium" onClick={handleIsChange} />
              </Tooltip>
              <Tooltip label="Delete" size="medium" position="top">
                <IconButton
                  type="button"
                  variant="delete"
                  size="medium"
                  onClick={() => dispatch(deleteCost(cost.id))}
                />
              </Tooltip>
            </div>
          </td>
        </tr>
      ) : (
        <tr className={styles.item}>
          <td className={styles.itemContent}>{number}</td>
          <td className={styles.itemContent}>
            <InputField
              classNameInput={styles.input}
              color="blue"
              size="small"
              type="text"
              value={editTitle}
              as="input"
              onChange={handleEditTitle}
            />
          </td>
          <td className={styles.itemContent}>
            <InputField
              classNameInput={styles.input}
              color="blue"
              size="small"
              type="number"
              value={editSum}
              as="input"
              onChange={handleEditSum}
            />
          </td>
          <td className={styles.itemContent}>
            <Select label="Category" items={selectItems} selected={editCategory} setSelected={setEditCategory} />
          </td>
          <td className={styles.itemContent}>
            <DatePicker selected={editDate} customInput={<Input />} onChange={date => setEditDate(date)} />
          </td>
          <td className={styles.itemContent}>
            <div className={styles.btnBox}>
              <Tooltip label="Accept" size="medium" position="top">
                <IconButton type="button" variant="confirm" size="medium" onClick={handleSubmit} />
              </Tooltip>
              <Tooltip label="Cancel" size="medium" position="top">
                <IconButton type="button" variant="cancel" size="medium" onClick={handleIsChange} />
              </Tooltip>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default CostItem;
