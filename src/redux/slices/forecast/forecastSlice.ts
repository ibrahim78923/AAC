import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  describeForm: {},
  teamDurationForm: {},
  planPermission: {},
  featureDetails: '',
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
    modulesFormData: (state, action) => {
      state.planPermission = action?.payload;
    },
    setFeatureDetails: (state, action) => {
      state.featureDetails = action?.payload;
    },
    clearState: () => initialState, // Reset the state to initial state
  },
});

export const {
  setDescribeFormData,
  setTeamDurationFormData,
  modulesFormData,
  setFeatureDetails,
  clearState,
} = forecastSlice?.actions;
export const getAddPlanForms = (state: any) =>
  state.forecastSlice?.describeForm;
export default forecastSlice.reducer;
