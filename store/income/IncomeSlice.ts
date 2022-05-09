import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { ICostIncome } from '../../interfaces/interfaces';
import { fetchIncomes } from './IncomeActionCreator';

interface ICostIncomeState {
  incomes: ICostIncome[];
  isLoading: boolean;
  error: string;
}

const initialCostState: ICostIncomeState = {
  incomes: [],
  isLoading: false,
  error: null,
};

export const incomeSlice = createSlice({
  name: 'income',
  initialState: initialCostState,
  reducers: {
    addIncome(state, action: PayloadAction<ICostIncome>) {
      state.incomes = [action.payload, ...state.incomes];
      state.isLoading = false;
      state.error = null;
    },
    removeIncome(state, action: PayloadAction<string>) {
      state.incomes = state.incomes.filter(income => income.id !== action.payload);
      state.isLoading = false;
      state.error = null;
    },
    editIncome(state, action: PayloadAction<ICostIncome>) {
      state.incomes = state.incomes.map(income => (income.id === action.payload.id ? action.payload : income));
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [fetchIncomes.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchIncomes.fulfilled.type]: (state, action: PayloadAction<ICostIncome[]>) => {
      state.incomes = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    [fetchIncomes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addIncome, removeIncome, editIncome } = incomeSlice.actions;

export const incomeReducer = combineReducers({
  incomes: incomeSlice.reducer,
});
