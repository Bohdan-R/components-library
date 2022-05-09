import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/interfaces';
import { fetchIncomeCategories, addIncomeCategory } from './IncomeCategoriesActionCreator';

interface CategoryState {
  categories: ICategory[];
  isLoading: boolean;
  error: string;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const incomeCategorySlice = createSlice({
  name: 'incomeCategory',
  initialState,
  reducers: {
    addNewCategory(state, action: PayloadAction<ICategory>) {
      state.categories = [...state.categories, action.payload];
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchIncomeCategories.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchIncomeCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchIncomeCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addNewCategory, removeCategory } = incomeCategorySlice.actions;

export default incomeCategorySlice.reducer;
