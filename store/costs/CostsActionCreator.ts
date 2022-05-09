import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICostIncome } from '../../interfaces/interfaces';
import { addCost, removeCost, editCost } from './CostsSlice';

export const fetchCosts = createAsyncThunk('cost/fetchCosts', async (_, thunkApi) => {
  try {
    const res = await axios.get<ICostIncome[]>('http://localhost:8000/costs');
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const addNewCost = createAsyncThunk('cost/addNewCost', async (cost: ICostIncome, thunkApi) => {
  try {
    await axios.post<ICostIncome>('http://localhost:8000/costs', cost);

    thunkApi.dispatch(addCost(cost));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const deleteCost = createAsyncThunk('cost/deleteCost', async (id: string, thunkApi) => {
  try {
    await axios.delete<ICostIncome>(`http://localhost:8000/costs/${id}`);

    thunkApi.dispatch(removeCost(id));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const updateCost = createAsyncThunk('cost/updateCost', async (cost: ICostIncome, thunkApi) => {
  try {
    await axios.put<ICostIncome>(`http://localhost:8000/costs/${cost.id}`, cost);

    thunkApi.dispatch(editCost(cost));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});
