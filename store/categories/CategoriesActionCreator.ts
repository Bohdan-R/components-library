import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNewCategory, removeCategory } from './CategoriesSlice';
import { ICategory } from '../../interfaces/interfaces';

export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_, thunkApi) => {
    try {
        const res = await axios.get<ICategory[]>('http://localhost:8000/categories');
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue('Error');
    }
});

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (category: ICategory, thunkApi) => {
        try {
            await axios.post<ICategory>('http://localhost:8000/categories', category);

            thunkApi.dispatch(addNewCategory(category));
        } catch (error) {
            return thunkApi.rejectWithValue('Error');
        }
    },
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id: string, thunkApi) => {
        try {
            await axios.delete<ICategory>(`http://localhost:8000/categories/${id}`);

            thunkApi.dispatch(removeCategory(id));
        } catch (error) {
            return thunkApi.rejectWithValue('Error');
        }
    },
);
