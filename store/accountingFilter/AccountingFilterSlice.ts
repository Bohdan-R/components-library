import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';

interface IFilter {
  filter: string;
  range: [number, number];
  category: string;
  sorting: string;
  date: Date;
  year: string;
  month: number;
}

interface IChartFilter {
  chartType: string;
  category: string;
  year: string;
  month: number;
}

interface ISwitcher {
  switcher: string;
}

interface IChartSwitcher {
  switcher: string[];
}

const initialFilter: IFilter = {
  filter: '',
  range: [0, 100],
  category: '',
  sorting: '',
  date: null,
  year: '',
  month: null,
};

const initialChartFilter: IChartFilter = {
  chartType: 'Bar',
  category: 'All categories',
  year: 'All years',
  month: null,
};

const initialSwitcher: ISwitcher = {
  switcher: 'Spending',
};

const initialChartSwitcher: IChartSwitcher = {
  switcher: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    changeRange(state, action: PayloadAction<[number, number]>) {
      state.range = action.payload;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    changeSorting(state, action: PayloadAction<string>) {
      state.sorting = action.payload;
    },
    changeDate(state, action: PayloadAction<Date>) {
      state.date = action.payload;
    },
    changeYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
    },
    changeMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
    /* resetFilter(state, action: PayloadAction<[number, number]>) {
      state = { ...initialFilter, range: action.payload };
    }, */ resetFilter(state) {
      state = initialFilter;
    },
  },
});

export const chartFilter = createSlice({
  name: 'chartFilter',
  initialState: initialChartFilter,
  reducers: {
    changeChartType(state, action: PayloadAction<string>) {
      state.chartType = action.payload;
    },
    changeChartCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    changeChartYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
    },
    changeChartMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
    resetChartFilter(state) {
      state = { ...initialChartFilter };
    },
  },
});

export const switcherSlice = createSlice({
  name: 'switcher',
  initialState: initialSwitcher,
  reducers: {
    changeSwitcher(state, action: PayloadAction<string>) {
      state.switcher = action.payload;
    },
  },
});

export const chartSwitcher = createSlice({
  name: 'chartSwitcher',
  initialState: initialChartSwitcher,
  reducers: {
    changeChartSwitcher(state, action: PayloadAction<string[]>) {
      state.switcher = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export const { changeRange } = filterSlice.actions;
export const { changeCategory } = filterSlice.actions;
export const { changeSorting } = filterSlice.actions;
export const { changeDate } = filterSlice.actions;
export const { changeYear } = filterSlice.actions;
export const { changeMonth } = filterSlice.actions;
export const { resetFilter } = filterSlice.actions;

export const { changeChartType } = chartFilter.actions;
export const { changeChartCategory } = chartFilter.actions;
export const { changeChartYear } = chartFilter.actions;
export const { changeChartMonth } = chartFilter.actions;
export const { resetChartFilter } = chartFilter.actions;

export const { changeSwitcher } = switcherSlice.actions;

export const { changeChartSwitcher } = chartSwitcher.actions;

export const accountingFilterReducer = combineReducers({
  filters: filterSlice.reducer,
  chartFilters: chartFilter.reducer,
  switcher: switcherSlice.reducer,
  chartSwitcher: chartSwitcher.reducer,
});
