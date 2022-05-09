import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import DatePicker from 'react-datepicker';

import IconButton from '../IconButton';
import InputField from '../InputField';
import Select from '../Select';
import Tooltip from '../Tooltip';

import { deleteCost, updateCost } from '../../store/costs/CostsActionCreator';
import { deleteIncome, updateIncome } from '../../store/income/IncomeActionCreator';

import { ICostIncome } from '../../interfaces/interfaces';
import { dateOptions } from '../../utils/constants';
import { setRuFormatDate } from '../../utils/helpers';

import styles from './CostItem.module.scss';

interface CostItemProps {
  item: ICostIncome;
  selectItems: string[];
  number: number;
  switcher: string;
}

function TableItem({ item, selectItems, number, switcher }: CostItemProps) {
  const dispatch = useAppDispatch();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<string>(item.category || '');
  const [editTitle, setEditTitle] = useState<string>(item.title || '');
  const [editSum, setEditSum] = useState<number | string>(item.sum || '');
  const [editDate, setEditDate] = useState<Date>(item.date ? new Date(item.date) : null);

  const handleEditTitle = (value: string) => {
    setEditTitle(value);
  };
  const handleEditSum = (value: number) => {
    setEditSum(value);
  };

  const handleUpdateCost = () => {
    const editedCost: ICostIncome = {
      id: item.id,
      title: editTitle,
      sum: editSum,
      category: editCategory,
      date: editDate.toLocaleString('en-US', dateOptions),
    };

    dispatch(updateCost(editedCost));
    handleIsChange();
  };

  const handleUpdateIncome = () => {
    const editedIncome: ICostIncome = {
      id: item.id,
      title: editTitle,
      sum: editSum,
      category: editCategory,
      date: editDate.toLocaleString('en-US', dateOptions),
    };

    dispatch(updateIncome(editedIncome));
    handleIsChange();
  };

  const handleDeleteCost = (id: string) => {
    dispatch(deleteCost(id));
  };

  const handleDeleteIncome = (id: string) => {
    dispatch(deleteIncome(id));
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
          {Object.entries(item)
            .slice(1)
            .map(c => (
              <td key={c[1]} className={styles.itemContent}>
                {c[0] === 'date' ? setRuFormatDate(c[1]) : c[1]}
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
                  onClick={() => {
                    if (switcher === 'Spending') {
                      return handleDeleteCost(item.id);
                    }
                    handleDeleteIncome(item.id);
                  }}
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
                <IconButton
                  type="button"
                  variant="confirm"
                  size="medium"
                  onClick={switcher === 'Spending' ? handleUpdateCost : handleUpdateIncome}
                />
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

export default TableItem;
