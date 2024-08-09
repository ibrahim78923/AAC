import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  describeForm: {},
  teamDurationForm: {},
  performanceData: {},
  filterValues: '',
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setDescribeFormData: (state, action) => {
      state.describeForm = action?.payload;
    },
    setTeamDurationFormData: (state, action) => {
      state.teamDurationForm = action?.payload;
    },
    setPerformanceData: (state, action) => {
      state.performanceData = action?.payload;
    },
    setFilterValues: (state, action) => {
      state.filterValues = action?.payload;
    },
    clearState: () => initialState, // Reset the state to initial state
  },
});

export const {
  setDescribeFormData,
  setTeamDurationFormData,
  setPerformanceData,
  setFilterValues,
  clearState,
} = forecastSlice?.actions;
export const getAddPlanForms = (state: any) =>
  state.forecastSlice?.describeForm;
export default forecastSlice.reducer;
