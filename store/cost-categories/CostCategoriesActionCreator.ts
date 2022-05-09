import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNewCategory, removeCategory } from './CostCategoriesSlice';
import { ICategory } from '../../interfaces/interfaces';

export const fetchCostCategories = createAsyncThunk('category/fetchCostCategories', async (_, thunkApi) => {
  try {
    const res = await axios.get<ICategory[]>('http://localhost:8000/cost-categories');
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const addCostCategory = createAsyncThunk('category/addCostCategory', async (category: ICategory, thunkApi) => {
  try {
    await axios.post<ICategory>('http://localhost:8000/cost-categories', category);

    thunkApi.dispatch(addNewCategory(category));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const deleteCostCategory = createAsyncThunk('category/deleteCostCategory', async (id: string, thunkApi) => {
  try {
    await axios.delete<ICategory>(`http://localhost:8000/cost-categories/${id}`);

    thunkApi.dispatch(removeCategory(id));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});
