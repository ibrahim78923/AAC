import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addPlanForm: {
    // Initial data for form 1
  },
  planFeaturesForm: {
    // Initial data for form 2
  },
  modulesForm: {
    // Initial data for form 3
  },
};

const planManagementSlice = createSlice({
  name: 'planManagement',
  initialState,
  reducers: {
    addPlanFormData: (state, action) => {
      state.addPlanForm = action.payload;
    },
    planFeaturesFormData: (state, action) => {
      state.planFeaturesForm = action.payload;
    },
    modulesFormData: (state, action) => {
      state.modulesForm = action.payload;
    },
  },
});

export const { addPlanFormData, planFeaturesFormData, modulesFormData } =
  planManagementSlice.actions;

export default planManagementSlice.reducer;
