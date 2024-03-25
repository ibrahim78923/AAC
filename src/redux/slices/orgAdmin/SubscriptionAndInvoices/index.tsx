import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SubscriptionAndInvoicesI {
  selectedPlanData: any;
}

const initialState: SubscriptionAndInvoicesI = {
  selectedPlanData: {},
};

const subscriptionAndInvoicesSlice = createSlice({
  name: 'subscriptionAndInvoices',
  initialState: initialState,
  reducers: {
    setSelectedPlanData: (state: any, action: PayloadAction<any>) => {
      state.selectedPlanData = action?.payload;
    },
  },
});
export const { setSelectedPlanData } = subscriptionAndInvoicesSlice.actions;
export default subscriptionAndInvoicesSlice.reducer;
