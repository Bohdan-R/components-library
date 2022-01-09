import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { costReducer } from './costs/CostsSlice';
import categoryReducer from './categories/CategoriesSlice';

const rootReducer = combineReducers({
    costReducer,
    categoryReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
