import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addPlanForm: {},
  planFeaturesForm: {},
  modulesForm: {},
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

export default planManagementSlice;
