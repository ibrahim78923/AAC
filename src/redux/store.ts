import { configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '../services/base-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import chatSlice from './slices/chat/slice';
import emailSlice from './slices/email/slice';
import authSlice from './slices/auth/slice';
import SocialInboxSlice from './slices/socialInbox/index';
import planManagementSlice from './slices/planManagement/planManagementSlice';
import taskManagementSlice from './slices/taskManagement/taskManagementSlice';
import dealsTaskSlice from './slices/airSales/Deals/ViewDetails/Tasks/taskSlice';
import subscriptionAndInvoicesSlice from './slices/orgAdmin/SubscriptionAndInvoices';

const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    chat: chatSlice,
    email: emailSlice,
    task: taskManagementSlice,
    task_deals: dealsTaskSlice,
    subscriptionAndInvoices: subscriptionAndInvoicesSlice,
    auth: authSlice,
    socialInbox: SocialInboxSlice,
    planManagementForms: planManagementSlice,
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
