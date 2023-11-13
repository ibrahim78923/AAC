import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addPlanForm: {},
  planFeature: {},
  planPermission: {},
  featureDetails: '',
};

const planManagementSlice = createSlice({
  name: 'planManagement',
  initialState,
  reducers: {
    addPlanFormData: (state, action) => {
      state.addPlanForm = action?.payload;
    },
    planFeaturesFormData: (state, action) => {
      state.planFeature = action?.payload;
    },
    modulesFormData: (state, action) => {
      state.planPermission = action?.payload;
    },
    setFeatureDetails: (state, action) => {
      state.featureDetails = action?.payload;
    },
  },
});

export const {
  addPlanFormData,
  planFeaturesFormData,
  modulesFormData,
  setFeatureDetails,
} = planManagementSlice?.actions;
export const getAddPlanForms = (state: any) =>
  state.planManagementSlice?.addPlanForm;
export default planManagementSlice;
