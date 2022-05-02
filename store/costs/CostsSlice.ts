import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { ICost } from '../../interfaces/interfaces';
import { addNewCost, fetchCosts } from './CostsActionCreator';

interface ICostState {
  costs: ICost[];
  isLoading: boolean;
  error: string;
}
interface IFilterState {
  filter: string;
  range: [number, number];
  category: string;
  sorting: string;
  date: Date;
  year: string;
  month: number;
}

const initialCostState: ICostState = {
  costs: [],
  isLoading: false,
  error: null,
};
const initialFilterState: IFilterState = {
  filter: '',
  range: [0, 100],
  category: '',
  sorting: '',
  date: null,
  year: '',
  month: null,
};

export const costSlice = createSlice({
  name: 'cost',
  initialState: initialCostState,
  reducers: {
    addCost(state, action: PayloadAction<ICost>) {
      state.costs = [action.payload, ...state.costs];
      state.isLoading = false;
      state.error = null;
    },
    removeCost(state, action: PayloadAction<string>) {
      state.costs = state.costs.filter(cost => cost.id !== action.payload);
      state.isLoading = false;
      state.error = null;
    },
    editCost(state, action: PayloadAction<ICost>) {
      state.costs = state.costs.map(cost => (cost.id === action.payload.id ? action.payload : cost));
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [fetchCosts.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchCosts.fulfilled.type]: (state, action: PayloadAction<ICost[]>) => {
      state.costs = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    [fetchCosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [addNewCost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
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
  },
});

export const { addCost, removeCost, editCost } = costSlice.actions;
export const { changeFilter } = filterSlice.actions;
export const { changeRange } = filterSlice.actions;
export const { changeCategory } = filterSlice.actions;
export const { changeSorting } = filterSlice.actions;
export const { changeDate } = filterSlice.actions;
export const { changeYear } = filterSlice.actions;
export const { changeMonth } = filterSlice.actions;

export const costReducer = combineReducers({
  costs: costSlice.reducer,
  filter: filterSlice.reducer,
});
