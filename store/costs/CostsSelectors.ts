import { createSelector } from '@reduxjs/toolkit';

const getAllCosts = state => state.costReducer.costs.costs;
const getFilter = state => state.costReducer.filter;

const getFilteredCosts = createSelector([getAllCosts, getFilter], (costs, {filter}) => {
  const normalizedFilter = filter.toLowerCase();

  return costs.filter(cost => cost.title.toLowerCase().includes(normalizedFilter));
});

const filtredPayment = createSelector([getAllCosts, getFilter], (payments, {filter, range, category}) => {

  const normalizedFilter = filter.toLowerCase();

  if (range[1] === 0 && !category) {
    return payments;
  }

  if (!category) {
    return payments.filter(
      p => p.sum >= range[0] && p.sum <= range[1] && p.title.toLowerCase().includes(normalizedFilter),
    );
  }

  if (category) {
    return payments.filter(
      p =>
        p.sum >= range[0] &&
        p.sum <= range[1] &&
        p.category === category &&
        p.title.toLowerCase().includes(normalizedFilter),
    );
  }

  return payments;
});

const getTotalAmountCosts = createSelector([getFilteredCosts], costs => {
  return costs.length;
});

const getMinSumOfCosts = state => {
  const costs = getAllCosts(state);

  return Math.min(...costs.map(c => c.sum));
};

const getMaxSumOfCosts = state => {
  const costs = getAllCosts(state);

  return Math.max(...costs.map(c => c.sum));
};

const getMinSumOfFilteredCosts = createSelector([getFilteredCosts], costs => {
  const numbers: number[] = [];

  costs.forEach(cost => {
    numbers.push(cost.sum);
  });

  return Math.min(...numbers);
});

const getMaxSumOfFilteredCosts = createSelector([getFilteredCosts], costs => {
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
  getMinSumOfFilteredCosts,
  getMaxSumOfFilteredCosts,
  filtredPayment,
};
