import { createSelector } from '@reduxjs/toolkit';

const getAllCosts = state => state.costReducer.costs.costs;
const getFilter = state => state.costReducer.filter;

/* const getFilteredCosts = createSelector([getAllCosts, getFilter], (costs, {filter}) => {
  const normalizedFilter = filter.toLowerCase();

  return costs.filter(cost => cost.title.toLowerCase().includes(normalizedFilter));
}); */

const filtredPayment222 = createSelector(
  [getAllCosts, getFilter],
  (payments, { filter, range, category, dateRange }) => {
    const Moment = require('moment');
    return payments.filter(
      ({ date }) => new Moment(dateRange[0]) >= new Moment(date) && new Moment(dateRange[1]) <= new Moment(date),
    );
  },
);

const filtredByFilter = createSelector([getAllCosts, getFilter], (payments, { filter }) => {
  const normalizedFilter = filter.toLowerCase();
  return payments.filter(p => p.title.toLowerCase().includes(normalizedFilter));
});

const filtredByCategory = createSelector([filtredByFilter, getFilter], (payments, { category }) => {
  if (!category) {
    return payments;
  }

  return payments.filter(p => p.category === category);
});

const filtredByRange = createSelector([filtredByCategory, getFilter], (payments, { range }) => {
  if (range[1] === 0) {
    return payments;
  }

  return payments.filter(p => p.sum >= range[0] && p.sum <= range[1]);
});

const filtredByDateRange = createSelector([filtredByRange, getFilter], (payments, { dateRange }) => {
  if (!dateRange[0] && !dateRange[1]) {
    return payments;
  }

  return payments.filter(
    p => new Date(p.date).getTime() >= dateRange[0].getTime() && new Date(p.date) <= dateRange[1].getTime(),
  );
});

const filtredPayment = createSelector([getAllCosts, getFilter], (payments, { filter, range, category, dateRange }) => {
  const normalizedFilter = filter.toLowerCase();

  console.log('AAAAAAAAAA', payments);
  if (range[1] === 0 && !category && !dateRange[0] && !dateRange[1]) {
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

const sortedPayment = createSelector([filtredByDateRange, getFilter], (payments, { sorting }) => {
  const Moment = require('moment');
  if (sorting === 'from largest to smallest sum') {
    return payments.sort((a, b) => b.sum - a.sum);
  }
  if (sorting === 'from smallest to largest sum') {
    return payments.sort((a, b) => a.sum - b.sum);
  }
  if (sorting === 'old date') {
    return payments.slice().sort((a, b) => new Moment(a.date) - new Moment(b.date));
  }
  if (sorting === 'new date') {
    return payments.slice().sort((a, b) => new Moment(b.date) - new Moment(a.date));
  }

  return payments.slice().sort((a, b) => new Moment(b.date) - new Moment(a.date));
});

/* const getTotalAmountCosts = createSelector([getFilteredCosts], costs => {
  return costs.length;
}); */

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

/* const getMinSumOfFilteredCosts = createSelector([getFilteredCosts], costs => {
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
}); */

export default {
  getFilter,
  getAllCosts,
  /* getFilteredCosts,
  getTotalAmountCosts, */
  getMinSumOfCosts,
  getMaxSumOfCosts,
  /* getMinSumOfFilteredCosts,
  getMaxSumOfFilteredCosts, */
  filtredPayment,
  filtredPayment222,
  sortedPayment,
};
