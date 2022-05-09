import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNewCategory, removeCategory } from './IncomeCategoriesSlice';
import { ICategory } from '../../interfaces/interfaces';

export const fetchIncomeCategories = createAsyncThunk('incomeCategory/fetchIncomeCategories', async (_, thunkApi) => {
  try {
    const res = await axios.get<ICategory[]>('http://localhost:8000/income-categories');
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const addIncomeCategory = createAsyncThunk(
  'incomeCategory/addIncomeCategory',
  async (category: ICategory, thunkApi) => {
    try {
      await axios.post<ICategory>('http://localhost:8000/income-categories', category);

      thunkApi.dispatch(addNewCategory(category));
    } catch (error) {
      return thunkApi.rejectWithValue('Error');
    }
  },
);

export const deleteIncomeCategory = createAsyncThunk(
  'incomeCategory/deleteIncomeCategory',
  async (id: string, thunkApi) => {
    try {
      await axios.delete<ICategory>(`http://localhost:8000/income-categories/${id}`);

      thunkApi.dispatch(removeCategory(id));
    } catch (error) {
      return thunkApi.rejectWithValue('Error');
    }
  },
);
