import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loyaltyDashboardDateRange: {
    startDate: new Date(),
    endDate: new Date(),
  },
};

const loyaltyProgramDashboardSlice = createSlice({
  name: 'loyaltyProgramDashboard',
  initialState,
  reducers: {
    setLoyaltyDashboardDateRange: (state, action) => {
      state.loyaltyDashboardDateRange = action?.payload;
    },
  },
});

export const { setLoyaltyDashboardDateRange } =
  loyaltyProgramDashboardSlice?.actions;
export default loyaltyProgramDashboardSlice.reducer;
