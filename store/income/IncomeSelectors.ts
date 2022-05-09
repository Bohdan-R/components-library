import { createSelector } from '@reduxjs/toolkit';

const getAllIncomes = state => state.incomeReducer.incomes.incomes;
const getFilter = state => state.accountingFilterReducer;

const filteredIncomes = createSelector(
  [getAllIncomes, getFilter],
  (incomes, { filter, range, category, date, year, month, sorting }) => {
    let filteredIncomes = incomes;

    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      filteredIncomes = filteredIncomes.filter(p => p.title.toLowerCase().includes(normalizedFilter));
    }

    if (category) {
      filteredIncomes = filteredIncomes.filter(p => p.category === category);
    }

    if (range[1] !== 0) {
      filteredIncomes = filteredIncomes.filter(p => p.sum >= range[0] && p.sum <= range[1]);
    }

    if (date) {
      filteredIncomes = filteredIncomes.filter(p => new Date(p.date).getTime() === new Date(date).getTime());
    }

    if (month) {
      filteredIncomes = filteredIncomes.filter(p => new Date(p.date).getMonth() + 1 === month);
    }

    if (year) {
      filteredIncomes = filteredIncomes.filter(p => new Date(p.date).getFullYear() === Number(year));
    }

    if (sorting === 'large -> small sum') {
      filteredIncomes = filteredIncomes.slice().sort((a, b) => b.sum - a.sum);
      return filteredIncomes;
    }
    if (sorting === 'small -> large sum') {
      filteredIncomes = filteredIncomes.slice().sort((a, b) => a.sum - b.sum);
      return filteredIncomes;
    }
    if (sorting === 'past -> current date') {
      filteredIncomes = filteredIncomes.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return filteredIncomes;
    }
    if (sorting === 'current -> past date') {
      filteredIncomes = filteredIncomes.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return filteredIncomes;
    }

    return filteredIncomes.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
);

const getMinSumOfIncomes = state => {
  const costs = getAllIncomes(state);

  return Math.min(...costs.map(c => c.sum));
};

const getMaxSumOfIncomes = state => {
  const costs = getAllIncomes(state);

  if (costs.length === 0) {
    return 0;
  }

  return Math.max(...costs.map(c => c.sum));
};

const getAllYearsOfIncomes = state => {
  const years = getAllIncomes(state).map(({ date }) => new Date(date).getFullYear());
  const uniqueYears = years.filter((year, ind, arr) => arr.indexOf(year) === ind).sort((a, b) => b - a);
  return uniqueYears;
};

export default {
  getFilter,
  getAllIncomes,
  getMinSumOfIncomes,
  getMaxSumOfIncomes,
  filteredIncomes,
  getAllYearsOfIncomes,
};
