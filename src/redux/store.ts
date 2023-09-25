import { configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '../services/base-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Define an action to set store initialization
// export const setStoreInitialized = createAction("store/setInitialized");

const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(baseAPI.middleware),
});

// store.dispatch(setStoreInitialized()); // Dispatch action to indicate store is initialized

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
