import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/interfaces';
import { addCategory, fetchCategories } from './CategoriesActionCreator';

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

/* const setPending = state => {
    state.isLoading = true;
};

const setError = (state, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.isLoading = false;
}; */

export const categorySlice = createSlice({
    name: 'category',
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
        [fetchCategories.pending.type]: state => {
            state.isLoading = true;
        },
        [fetchCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        [fetchCategories.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [addCategory.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { addNewCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
