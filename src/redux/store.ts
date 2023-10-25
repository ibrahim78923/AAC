import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '../services/base-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';

import chatSlice from './slices/chat/slice';
import { persistReducer } from 'redux-persist';
import planManagementSlice from './slices/planManagement/planManagementSlice';

const persistConfig = {
  key: 'role',
  storage,
};
const reducer = combineReducers({
  planManagement: planManagementSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    chat: chatSlice,
    planManagementForms: persistedReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(baseAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
