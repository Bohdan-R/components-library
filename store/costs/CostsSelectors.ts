import { createSelector } from '@reduxjs/toolkit';

const getAllCosts = state => state.costReducer.costs.costs;
const getFilter = state => state.costReducer.filter;

const getFilteredCosts = createSelector([getAllCosts, getFilter], (costs, filter) => {
    const normalizedFilter = filter.value.toLowerCase();

    return costs.filter(cost => cost.title.toLowerCase().includes(normalizedFilter));
});

/* const getTotalAmountCosts = state => {
    const costs = getAllCosts(state);

    return costs.length;
}; */

const getTotalAmountCosts = createSelector([getFilteredCosts], costs => {
    return costs.length;
});

/* const getMinSumOfCosts = state => {
    const costs = getAllCosts(state);
    const numbers: number[] = [];

    costs.forEach(cost => {
        numbers.push(cost.sum);
    });

    return Math.min(...numbers);
}; */

const getMinSumOfCosts = createSelector([getFilteredCosts], costs => {
    const numbers: number[] = [];

    costs.forEach(cost => {
        numbers.push(cost.sum);
    });

    return Math.min(...numbers);
});

/* const getMaxSumOfCosts = state => {
    const costs = getAllCosts(state);
    const numbers: number[] = [];

    costs.forEach(cost => {
        numbers.push(cost.sum);
    });

    return Math.max(...numbers);
}; */

const getMaxSumOfCosts = createSelector([getFilteredCosts], costs => {
    const numbers: number[] = [];

    costs.forEach(cost => {
        numbers.push(cost.sum);
    });

    return Math.max(...numbers);
});

export default {
    getFilter,
    getAllCosts,
    getFilteredCosts,
    getTotalAmountCosts,
    getMinSumOfCosts,
    getMaxSumOfCosts,
};
