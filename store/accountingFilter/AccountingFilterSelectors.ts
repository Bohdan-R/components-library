import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

import { months } from '../../utils/constants';

const getAllSpending = state => state.costReducer.costs.costs;
const getAllIncomes = state => state.incomeReducer.incomes.incomes;
const getFilter = state => state.accountingFilterReducer.chartFilters;
const getChartSwitcher = state => state.accountingFilterReducer.chartSwitcher;

const getFilteredChartDate = (data, category, year, month, allYearsOfIncomes, allYearsOfSpending, label) => {
  let years = null;
  let chartLabel = null;
  let chartLabels = null;
  let chartData = null;
  let filteredData = data.map(p => {
    return { ...p, year: new Date(p.date).getFullYear(), month: new Date(p.date).getMonth() + 1 };
  });

  const getUniqueYears = data => {
    const years = data.map(({ date }) => new Date(date).getFullYear());
    const uniqueYears = years.filter((year, ind, arr) => arr.indexOf(year) === ind).sort((a, b) => a - b);
    return uniqueYears;
  };

  const getArrayOfLabelsAndSum = (arr, groupBy) => {
    const groupedBy = _.groupBy(arr, groupBy);
    const entries = Object.entries(groupedBy);
    const chartData = entries.map(([key, data]) => {
      let totalSumPerYear = data.reduce((acc, data) => acc + Number(data.sum), 0);
      return { label: key, sum: totalSumPerYear };
    });

    return chartData;
  };

  const getFilledBy = (data, values, filledBy) => {
    const filledData = values.map(v => {
      let valueWithSum = null;

      data.forEach(data => {
        if (data.label === v.toString()) {
          return (valueWithSum = { label: filledBy === 'year' ? v.toString() : months[v], sum: data.sum });
        }
      });

      if (valueWithSum) {
        return valueWithSum;
      }

      return { label: filledBy === 'year' ? v.toString() : months[v], sum: 0 };
    });
    return filledData;
  };

  const getChartDatasets = (data, label) => {
    chartLabels = data.map(({ label }) => label);
    chartData = data.map(({ sum }) => sum);

    const chartDatasets = { label: label, labels: chartLabels, data: chartData };

    return chartDatasets;
  };

  years =
    getUniqueYears(allYearsOfSpending).length >= getUniqueYears(allYearsOfIncomes).length
      ? getUniqueYears(allYearsOfSpending)
      : getUniqueYears(allYearsOfIncomes);

  // all data

  if (category === 'All categories' && year === 'All years' && !month) {
    chartLabel = label === 'Incomes' ? 'Incomes' : 'Spending';
    filteredData = getArrayOfLabelsAndSum(filteredData, 'year');

    const chartDatasets = getChartDatasets(filteredData, chartLabel);

    return chartDatasets;
  }

  // only for the selected category ==========================================

  if (category !== 'All categories' && year === 'All years' && !month) {
    chartLabel = label === 'Incomes' ? `Incomes - cat. ${category}` : `Spending - cat. ${category}`;
    filteredData = filteredData.filter(data => data.category === category);
    filteredData = getArrayOfLabelsAndSum(filteredData, 'year');
    filteredData = getFilledBy(filteredData, years, 'year');

    const chartDatasets = getChartDatasets(filteredData, chartLabel);

    return chartDatasets;
  }

  // only for the selected month ==========================================

  if (category === 'All categories' && year === 'All years' && month) {
    chartLabel = label === 'Incomes' ? `Incomes - ${months[month]}` : `Spending - ${months[month]}`;
    filteredData = filteredData.filter(data => data.month === month);
    filteredData = getArrayOfLabelsAndSum(filteredData, 'year');
    filteredData = getFilledBy(filteredData, years, 'year');

    const chartDatasets = getChartDatasets(filteredData, chartLabel);

    return chartDatasets;
  }

  // only for the selected year ==========================================

  if (category === 'All categories' && year !== 'All years' && !month) {
    chartLabel = label === 'Incomes' ? `Incomes - ${year} year` : `Spending - ${year} year`;
    filteredData = filteredData.filter(data => data.year === Number(year));

    filteredData = getArrayOfLabelsAndSum(filteredData, 'month');

    filteredData = getFilledBy(filteredData, Object.keys(months), 'month');

    const chartDatasets = getChartDatasets(filteredData, chartLabel);

    return chartDatasets;
  }

  // for the selected category and year ==========================================

  if (category !== 'All categories' && year !== 'All years' && !month) {
    chartLabel =
      label === 'Incomes'
        ? `Incomes - cat. ${category} for ${year} year`
        : `Spending - cat. ${category} for ${year} year`;
    filteredData = filteredData.filter(data => {
      return data.year === Number(year) && data.category === category;
    });

    filteredData = getArrayOfLabelsAndSum(filteredData, 'month');

    filteredData = getFilledBy(filteredData, Object.keys(months), 'month');

    const chartDatasets = getChartDatasets(filteredData, chartLabel);

    return chartDatasets;
  }

  // for the selected category and month ==========================================

  if (category !== 'All categories' && year === 'All years' && month) {
    chartLabel =
      label === 'Incomes'
        ? `Incomes - cat. ${category} for ${months[month]}`
        : `Spending - cat. ${category} for ${months[month]}`;
    filteredData = filteredData.filter(data => {
      return data.category === category && data.month === month;
    });
    filteredData = getArrayOfLabelsAndSum(filteredData, 'year');
    filteredData = getFilledBy(filteredData, years, 'year');

    const chartDatasets = getChartDatasets(filteredData, chartLabel);

    return chartDatasets;
  }

  // for the selected year and month ==========================================

  if (category === 'All categories' && year !== 'All years' && month) {
    chartLabel =
      label === 'Incomes' ? `Incomes - ${months[month]} ${year} year` : `Spending - ${months[month]} ${year} year`;
    filteredData = filteredData.filter(data => {
      return data.year === Number(year) && data.year === Number(year) && data.month === month;
    });

    chartLabels = [`${months[month]} ${year}`];
    chartData = [filteredData.reduce((acc, data) => acc + Number(data.sum), 0)];

    const chartDatasets = { label: chartLabel, labels: chartLabels, data: chartData };

    return chartDatasets;
  }

  // for the selected category, year and month ==========================================

  if (category !== 'All categories' && year !== 'All years' && month) {
    chartLabel =
      label === 'Incomes'
        ? `Incomes - cat. ${category} for ${months[month]} ${year} year`
        : `Spending - cat. ${category} for ${months[month]} ${year} year`;
    filteredData = filteredData.filter(data => {
      return data.year === Number(year) && data.category === category && data.month === month;
    });

    chartLabels = [months[month]];
    chartData = [filteredData.reduce((acc, data) => acc + Number(data.sum), 0)];

    const chartDatasets = { label: chartLabel, labels: chartLabels, data: chartData };

    return chartDatasets;
  }
};

const getFilteredPayments = createSelector(
  [getAllSpending, getAllIncomes, getFilter],
  (spending, incomes, { category, year, month }) => {
    return getFilteredChartDate(spending, category, year, month, incomes, spending, 'Spending');
  },
);

const getFilteredIncomes = createSelector(
  [getAllIncomes, getAllSpending, getFilter],
  (incomes, spending, { category, year, month }) => {
    return getFilteredChartDate(incomes, category, year, month, incomes, spending, 'Incomes');
  },
);

export default {
  getAllSpending,
  getAllIncomes,
  getFilter,
  getChartSwitcher,
  getFilteredPayments,
  getFilteredIncomes,
};
