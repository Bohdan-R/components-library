import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { costReducer } from './costs/CostsSlice';
import { incomeReducer } from './income/IncomeSlice';
import costCategoryReducer from './cost-categories/CostCategoriesSlice';
import incomeCategoryReducer from './income-categories/IncomeCategoriesSlice';
import { accountingFilterReducer } from './accountingFilter/AccountingFilterSlice';

const rootReducer = combineReducers({
  costReducer,
  incomeReducer,
  costCategoryReducer,
  incomeCategoryReducer,
  accountingFilterReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
