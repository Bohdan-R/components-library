import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICost } from '../../interfaces/interfaces';
import { addNewCost, fetchCosts } from './CostsActionCreator';

interface CostState {
    costs: ICost[];
    isLoading: boolean;
    error: string;
}

const initialState: CostState = {
    costs: [],
    isLoading: false,
    error: null,
};

export const costSlice = createSlice({
    name: 'cost',
    initialState,
    reducers: {
        addCost(state, action: PayloadAction<ICost>) {
            state.costs = [...state.costs, action.payload];
            state.isLoading = false;
            state.error = null;
        },
        removeCost(state, action: PayloadAction<string>) {
            state.costs = state.costs.filter(cost => cost.id !== action.payload);
            state.isLoading = false;
            state.error = null;
        },
        editCost(state, action: PayloadAction<ICost>) {
            state.costs = state.costs.map(cost =>
                cost.id === action.payload.id ? action.payload : cost,
            );
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: {
        [fetchCosts.pending.type]: state => {
            state.isLoading = true;
        },
        [fetchCosts.fulfilled.type]: (state, action: PayloadAction<ICost[]>) => {
            state.costs = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        [fetchCosts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [addNewCost.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { addCost, removeCost, editCost } = costSlice.actions;

export default costSlice.reducer;
