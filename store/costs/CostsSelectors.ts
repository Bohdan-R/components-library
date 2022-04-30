import { createSelector } from '@reduxjs/toolkit';

const getAllCosts = state => state.costReducer.costs.costs;
const getFilter = state => state.costReducer.filter;

const filteredPayments = createSelector(
  [getAllCosts, getFilter],
  (payments, { filter, range, category, dateRange, sorting }) => {
    const Moment = require('moment');
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

    if (dateRange[0] && dateRange[1]) {
      filteredPayments = filteredPayments.filter(
        p => new Date(p.date).getTime() >= dateRange[0].getTime() && new Date(p.date) <= dateRange[1].getTime(),
      );
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
      filteredPayments = filteredPayments.slice().sort((a, b) => new Moment(a.date) - new Moment(b.date));
      return filteredPayments;
    }
    if (sorting === 'current -> past date') {
      filteredPayments = filteredPayments.slice().sort((a, b) => new Moment(b.date) - new Moment(a.date));
      return filteredPayments;
    }

    return filteredPayments.slice().sort((a, b) => new Moment(b.date) - new Moment(a.date));
  },
);

const getMinSumOfCosts = state => {
  const costs = getAllCosts(state);

  return Math.min(...costs.map(c => c.sum));
};

const getMaxSumOfCosts = state => {
  const costs = getAllCosts(state);

  if (costs.length === 0) {
    return 0;
  }

  return Math.max(...costs.map(c => c.sum));
};

export default {
  getFilter,
  getAllCosts,
  getMinSumOfCosts,
  getMaxSumOfCosts,
  filteredPayments,
};
