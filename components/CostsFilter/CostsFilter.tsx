import React from 'react';
import InputField from '../InputField';
import costsSelectors from '../../store/costs/CostsSelectors';
import styles from './CostsFilter.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { changeFilter } from '../../store/costs/CostsSlice';

function CostsFilter() {
    const dispatch = useAppDispatch();
    const { value } = useSelector(costsSelectors.getFilter);
    const costs = useSelector(costsSelectors.getAllCosts);
    const amount = useSelector(costsSelectors.getTotalAmountCosts);
    const minValue = useSelector(costsSelectors.getMinSumOfCosts);

    console.log('AMOUNT:', amount);
    console.log('MIN', minValue);
    console.log('AllCosts', costs);
    console.log('GetFilter', value);
    const handleChange = (value: string) => {
        dispatch(changeFilter(value));
    };
    return (
        <div className={styles.container}>
            <InputField
                color="blue"
                size="medium"
                label="search"
                type="text"
                value={value}
                as="input"
                autoComplete="off"
                onChange={handleChange}
            />
        </div>
    );
}

export default CostsFilter;
