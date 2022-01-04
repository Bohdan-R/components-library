import { AppDispatch } from '../store';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICost } from '../../interfaces/interfaces';
import { addCost, removeCost, editCost } from './CostsSlice';

export const fetchCosts = createAsyncThunk('cost/fetchCosts', async (_, thunkApi) => {
    try {
        const res = await axios.get<ICost[]>('http://localhost:8000/costs');
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue('Error');
    }
});

export const addNewCost = createAsyncThunk('cost/addNewCost', async (cost: ICost, thunkApi) => {
    try {
        await axios.post<ICost>('http://localhost:8000/costs', cost);

        thunkApi.dispatch(addCost(cost));
    } catch (error) {
        return thunkApi.rejectWithValue('Error');
    }
});

export const deleteCost = createAsyncThunk('cost/deleteCost', async (id: string, thunkApi) => {
    try {
        await axios.delete<ICost>(`http://localhost:8000/costs/${id}`);

        thunkApi.dispatch(removeCost(id));
    } catch (error) {
        return thunkApi.rejectWithValue('Error');
    }
});

export const updateCost = createAsyncThunk('cost/updateCost', async (cost: ICost, thunkApi) => {
    try {
        await axios.put<ICost>(`http://localhost:8000/costs/${cost.id}`, cost);

        thunkApi.dispatch(editCost(cost));
    } catch (error) {
        return thunkApi.rejectWithValue('Error');
    }
});
