import React, { useEffect } from 'react';
import CostsPage from '../../components/PageComponent/CostsPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCategories } from '../../store/categories/CategoriesActionCreator';
import { fetchCosts } from '../../store/costs/CostsActionCreator';
import styles from './Costs.module.scss';

function Costs() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchCosts());
    }, []);
    return (
        <div className={styles.container}>
            <CostsPage />
        </div>
    );
}

export default Costs;
