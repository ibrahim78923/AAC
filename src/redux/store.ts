import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '../services/base-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import chatSlice from './slices/chat/slice';
import authSlice from './slices/auth/slice';
import SocialInboxSlice from './slices/socialInbox/index';
import { persistReducer } from 'redux-persist';
import planManagementSlice from './slices/planManagement/planManagementSlice';
import taskManagementSlice from './slices/taskManagement/taskManagementSlice';
import dealsTaskSlice from './slices/airSales/Deals/ViewDetails/Tasks/taskSlice';
import subscriptionAndInvoicesSlice from './slices/orgAdmin/SubscriptionAndInvoices';

const persistConfig = {
  key: 'role',
  timeout: 1000,
  storage,
  whitelist: ['planManagement'],
};

const reducer = combineReducers({
  planManagement: planManagementSlice?.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    chat: chatSlice,
    task: taskManagementSlice,
    task_deals: dealsTaskSlice,
    subscriptionAndInvoices: subscriptionAndInvoicesSlice,
    auth: authSlice,
    socialInbox: SocialInboxSlice,
    planManagementForms: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
