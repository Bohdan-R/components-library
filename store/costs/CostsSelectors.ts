import { createSelector } from '@reduxjs/toolkit';

const getAllPayments = state => state.costReducer.costs.costs;
const getFilter = state => state.accountingFilterReducer.filters;

const filteredPayments = createSelector(
  [getAllPayments, getFilter],
  (payments, { filter, range, category, date, year, month, sorting }) => {
    let filteredPayments = payments;

    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      filteredPayments = filteredPayments.filter(p => p.title.toLowerCase().includes(normalizedFilter));
    }

    if (category) {
      filteredPayments = filteredPayments.filter(p => p.category === category);
    }

    if (range[1] !== 0) {
      filteredPayments = filteredPayments.filter(p => p.sum >= range[0] && p.sum <= range[1]);
    }

    if (date) {
      filteredPayments = filteredPayments.filter(p => new Date(p.date).getTime() === new Date(date).getTime());
    }

    if (month) {
      filteredPayments = filteredPayments.filter(p => new Date(p.date).getMonth() + 1 === month);
    }

    if (year) {
      filteredPayments = filteredPayments.filter(p => new Date(p.date).getFullYear() === Number(year));
    }

    if (sorting === 'large -> small sum') {
      filteredPayments = filteredPayments.slice().sort((a, b) => b.sum - a.sum);
      return filteredPayments;
    }
    if (sorting === 'small -> large sum') {
      filteredPayments = filteredPayments.slice().sort((a, b) => a.sum - b.sum);
      return filteredPayments;
    }
    if (sorting === 'past -> current date') {
      filteredPayments = filteredPayments
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return filteredPayments;
    }
    if (sorting === 'current -> past date') {
      filteredPayments = filteredPayments
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return filteredPayments;
    }

    return filteredPayments.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
);

const getMinSumOfCosts = state => {
  const costs = getAllPayments(state);

  return Math.min(...costs.map(c => c.sum));
};

const getMaxSumOfCosts = state => {
  const costs = getAllPayments(state);

  if (costs.length === 0) {
    return 0;
  }

  return Math.max(...costs.map(c => c.sum));
};

const getAllYearsOfPayments = state => {
  const years = getAllPayments(state).map(({ date }) => new Date(date).getFullYear());
  const uniqueYears = years.filter((year, ind, arr) => arr.indexOf(year) === ind).sort((a, b) => b - a);
  return uniqueYears;
};

export default {
  getFilter,
  getAllPayments,
  getMinSumOfCosts,
  getMaxSumOfCosts,
  filteredPayments,
  getAllYearsOfPayments,
};
