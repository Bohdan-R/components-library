import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICostIncome } from '../../interfaces/interfaces';
import { addIncome, removeIncome, editIncome } from './IncomeSlice';

export const fetchIncomes = createAsyncThunk('cost/fetchIncome', async (_, thunkApi) => {
  try {
    const res = await axios.get<ICostIncome[]>('http://localhost:8000/incomes');
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const addNewIncome = createAsyncThunk('cost/addNewIncome', async (income: ICostIncome, thunkApi) => {
  try {
    await axios.post<ICostIncome>('http://localhost:8000/incomes', income);

    thunkApi.dispatch(addIncome(income));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const deleteIncome = createAsyncThunk('cost/deleteIncome', async (id: string, thunkApi) => {
  try {
    await axios.delete<ICostIncome>(`http://localhost:8000/incomes/${id}`);

    thunkApi.dispatch(removeIncome(id));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});

export const updateIncome = createAsyncThunk('cost/updateCost', async (income: ICostIncome, thunkApi) => {
  try {
    await axios.put<ICostIncome>(`http://localhost:8000/incomes/${income.id}`, income);

    thunkApi.dispatch(editIncome(income));
  } catch (error) {
    return thunkApi.rejectWithValue('Error');
  }
});
