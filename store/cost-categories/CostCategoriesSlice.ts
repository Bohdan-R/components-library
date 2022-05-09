import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/interfaces';
import { fetchCostCategories, addCostCategory } from './CostCategoriesActionCreator';

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

export const costCategorySlice = createSlice({
  name: 'costCategory',
  initialState,
  reducers: {
    addNewCategory(state, action: PayloadAction<ICategory>) {
      state.categories = [...state.categories, action.payload];
      state.isLoading = false;
      state.error = null;
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchCostCategories.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchCostCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchCostCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [addCostCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addNewCategory, removeCategory } = costCategorySlice.actions;

export default costCategorySlice.reducer;
