import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterState {
  filter: string;
  range: [number, number];
  category: string;
  sorting: string;
  date: Date;
  year: string;
  month: number;
}

const initialFilterState: IFilterState = {
  filter: '',
  range: [0, 100],
  category: '',
  sorting: '',
  date: null,
  year: '',
  month: null,
};

export const accountingFilterSlice = createSlice({
  name: 'accountingFilter',
  initialState: initialFilterState,
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    changeRange(state, action: PayloadAction<[number, number]>) {
      state.range = action.payload;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    changeSorting(state, action: PayloadAction<string>) {
      state.sorting = action.payload;
    },
    changeDate(state, action: PayloadAction<Date>) {
      state.date = action.payload;
    },
    changeYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
    },
    changeMonth(state, action: PayloadAction<number>) {
      state.month = action.payload;
    },
  },
});

export const { changeFilter } = accountingFilterSlice.actions;
export const { changeRange } = accountingFilterSlice.actions;
export const { changeCategory } = accountingFilterSlice.actions;
export const { changeSorting } = accountingFilterSlice.actions;
export const { changeDate } = accountingFilterSlice.actions;
export const { changeYear } = accountingFilterSlice.actions;
export const { changeMonth } = accountingFilterSlice.actions;

export default accountingFilterSlice.reducer;
