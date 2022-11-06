import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import classNames from 'classnames/bind';

import chartSelectors from '../../../../../store/accountingFilter/AccountingFilterSelectors';

import styles from './Chart.module.scss';

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);
const colors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(33, 245, 252)',
  'rgb(73, 214, 58)',
  'rgb(247, 106, 45)',
  'rgb(83, 252, 162)',
  'rgb(252, 83, 244)',
  'rgb(83, 86, 252)',
  'rgb(219, 213, 48)',
  'rgb(33, 245, 252)',
  'rgb(73, 214, 58)',
  'rgb(247, 106, 45)',
  'rgb(255, 66, 76)',
  'rgb(252, 83, 244)',
  'rgb(37, 207, 46)',
];

function Chart() {
  const dispatch = useAppDispatch();
  const { switcher: mainSwitcher } = useAppSelector(state => state.accountingFilterReducer.switcher);
  const { switcher: chartSwitcher } = useAppSelector(state => state.accountingFilterReducer.chartSwitcher);
  const chartFilters = useAppSelector(state => state.accountingFilterReducer.chartFilters);
  const allSpending = useSelector(chartSelectors.getFilteredPayments);
  const allIncomes = useSelector(chartSelectors.getFilteredIncomes);
  /* const TEST_DATA = useSelector(chartSelectors.getFilteredAAAAA); */

  /* console.log('TEST_DATA: ', TEST_DATA); */
  console.log('allSpending: ', allSpending);

  /* console.log('allSpending: ', allSpending);
  console.log('allIncomes: ', allIncomes); */

  const [chartType, setChartType] = useState<string>('');
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDatasetSpending, setChartDatasetSpending] = useState(null);
  const [chartDatasetIncomes, setChartDatasetIncomes] = useState(null);
  const [chartCircleDatasetSpending, setChartCircleDatasetSpending] = useState(null);
  const [chartCircleDatasetIncomes, setChartCircleDatasetIncomes] = useState(null);

  /* console.log('AAAAAAAAA: ', {
    chartDatasetSpending,
    chartDatasetIncomes,
    chartCircleDatasetSpending,
    chartCircleDatasetIncomes,
  });

  console.log('chartLabels: ', chartLabels.length); */

  useEffect(() => {
    if (mainSwitcher === 'Spending') {
      setChartLabels(allSpending?.labels);
    }

    if (mainSwitcher === 'Incomes') {
      setChartLabels(allIncomes?.labels);
    }
  }, [mainSwitcher, allIncomes?.labels, allSpending?.labels]);

  useEffect(() => {
    const incomesChartCircleObj = {
      label: allIncomes?.label,
      data: allIncomes?.data,
      backgroundColor: colors.slice(0, chartLabels?.length),
    };
    const spendingChartCircleObj = {
      label: allSpending?.label,
      data: allSpending?.data,
      backgroundColor: colors.slice(0, chartLabels?.length),
    };
    const incomesChartObj = {
      label: allIncomes?.label,
      data: allIncomes?.data,
      backgroundColor: 'rgba(37, 207, 46, 0.7)',
      borderColor: 'rgba(37, 207, 46, 0.9)',
      tension: 0.2,
    };

    const spendingChartObj = {
      label: allSpending?.label,
      data: allSpending?.data,
      backgroundColor: 'rgba(255, 66, 76, 0.7)',
      borderColor: 'rgba(255, 66, 76, 0.9)',
      tension: 0.2,
    };

    setChartDatasetSpending(spendingChartObj);
    setChartCircleDatasetSpending(incomesChartCircleObj);
    setChartDatasetIncomes(incomesChartObj);
    setChartCircleDatasetIncomes(spendingChartCircleObj);
  }, [chartSwitcher, allIncomes?.label, allIncomes?.data, allSpending?.data, allSpending?.label, chartLabels?.length]);

  useEffect(() => {
    setChartType(chartFilters.chartType);
  }, [chartFilters.chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart of Spending / Incomes',
        font: {
          family: 'roboto',
          size: 20,
          lineHeight: 0,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
  };

  const data = {
    labels: chartLabels,
    datasets: [
      chartSwitcher.includes('Spending') && chartDatasetSpending,
      chartSwitcher.includes('Incomes') && chartDatasetIncomes,
    ].filter(data => data),
  };

  const dataCircleIncomes = {
    labels: chartLabels,
    datasets: [chartCircleDatasetSpending],
  };
  const dataCircleSpending = {
    labels: chartLabels,
    datasets: [chartCircleDatasetIncomes],
  };

  const renderCircleChart = (options, data) => {
    return (
      <div className={styles.pie} style={{ height: chartSwitcher.length === 1 ? 540 : 270 }}>
        <Doughnut options={options} data={data} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {chartType === 'Bar' && <Bar options={options} data={data} />}

      {chartType === 'Line' && <Line options={options} data={data} />}
      {chartType === 'Circle' && chartSwitcher.includes('Incomes') && renderCircleChart(options, dataCircleIncomes)}
      {chartType === 'Circle' && chartSwitcher.includes('Spending') && renderCircleChart(options, dataCircleSpending)}
    </div>
  );
}

export default Chart;

/* {chartType === 'Circle' && (chartCircleDatasetSpending?.label || chartCircleDatasetIncomes?.label) && (
        <div className={styles.pies}>
          {chartSwitcher.includes('Incomes') &&
            chartCircleDatasetIncomes &&
            chartCircleDatasetIncomes?.label &&
            renderCircleChart(options, dataCircleIncomes)}

          {chartSwitcher.includes('Spending') &&
            chartCircleDatasetSpending &&
            chartCircleDatasetSpending?.label &&
            renderCircleChart(options, dataCircleSpending)}
        </div>
      )} */
